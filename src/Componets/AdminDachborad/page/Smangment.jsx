import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Tables from "./Tables";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useState } from "react";
import Dialoge from "./Dialoge";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import Subscriptions from "./Subscriptions";
import axios from "axios";
const statusConfig = {
  active: {
    label: "active",
    color: "success",
  },
  expired: {
    label: "expired",
    color: "warning",
  },
  canceled: { label: "Canceled", color: "error" },
};
const SubscriptionConfig = {
  Premium: {
    label: "Premium",
    bgcolor: "#F3E8FF",
    color: "#B128DD",
  },

  Standard: {
    label: "Standard",
    bgcolor: "#DBEAFE",
    color: "#1447EA",
  },
};

const filed = [
  { label: "Plan Name", name: "PlanName" },
  { label: "Monthly Price ($)", name: "price", type: "number" },

  { label: "Features (one per line)", name: "Features", type: "multiline" },
];
export default function Smangment() {
  const [open, setOpen] = useState(false);
  const [sabscInfo, setsabscInfo] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [selecteid, setSelected] = useState("first");
  const [formValues, setFormValues] = useState({});
  const [mode, setMode] = useState("add");
  const [selectedId, setSelectedId] = useState(null);
  const [all, setAll] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditPlan = (plan) => {
    setMode("edit");
    setSelectedId(plan._id); // أو plan.id حسب الباك
    setFormValues({
      PlanName: plan.name,
      price: plan.price,
      Features: plan.features?.join("\n"),
    });
    setOpen(true);
  };
  const handelGetPlans = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(import.meta.env.VITE_API_URL + "/plans/getPlans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setsabscInfo(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
    console.log("FORM DATA 👉", formValues);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
          import.meta.env.VITE_API_URL + "/plans/addPlan",
        {
          name: formValues.PlanName,
          price: formValues.price, // <--- _id
          features: formValues.Features, // <--- _id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      handleClose();
      handelGetPlans();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/plans/updatePlan/${id}`,
        {
          name: formValues.name,
          price: formValues.price, // <--- _id
          features: formValues.Features,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      handleClose();
      handelGetPlans();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeletePlan = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Plan ?"
    );
    if (!isConfirmed) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/plans/deletePlan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      handleClose();
      handelGetPlans();
    } catch (err) {
      console.log(err);
    }
  };
  const handelGetSubscriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.get(
          import.meta.env.VITE_API_URL + "/mangmentBussnies/allbussnise",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAll(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const tableRow = [
    {
      header: "Business Name",
      render: (row) => row.busId?.name || "-",
    },

    {
      header: "Subscription",
      render: (row) => {
        const planName = row.planId?.name;
        const config = SubscriptionConfig[planName];

        return (
          <Chip
            label={config?.label || planName}
            size="small"
            sx={{
              whiteSpace: "nowrap",
              bgcolor: config?.bgcolor,
              color: config?.color,
            }}
          />
        );
      },
    },
    {
      header: "Status",
      render: (row) => {
        // const status = row.busId?.isActive ? "active" : "disabled";
        const status = row.status;
        const config = statusConfig[status];

        return (
          <Chip
            label={config?.label || row.status}
            color={config?.color || "default"}
            size="small"
            sx={{ whiteSpace: "nowrap" }}
          />
        );
      },
    },
    {
      header: "Start Date",
      render: (row) =>
        row.startDate
          ? new Date(row.startDate)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")
          : "-",
    },
    {
      header: "End Date",
      render: (row) =>
        row.endDate
          ? new Date(row.endDate)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")
          : "-",
    },
    {
      header: "Actions",
      render: () => (
        <>
          <Button>Update Plan</Button>
        </>
      ),
    },
  ];
  useEffect(() => {
    handelGetPlans();
    handelGetSubscriptions();
  }, []);
  return (
    <Stack>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5">Subscriptions Management</Typography>
          <Typography variant="body2">
            Manage subscription plans and assignments
          </Typography>
        </Box>
        <Button
          startIcon={<AddOutlinedIcon />}
          onClick={handleClickOpen}
          variant="contained"
          sx={{ borderRadius: 3 }}
        >
          Create New Plan
        </Button>
      </Box>
      <Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{
              borderBottom: selecteid === "first" ? "1px solid" : "none",
              borderRadius: 0,
              transition: "border-bottom 0.3s ease",
              color: selecteid === "first" ? "#1976D2" : "#000",
            }}
            onClick={() => {
              setSelected("first");
            }}
          >
            Subscription Plans
          </Button>
          <Button
            sx={{
              borderBottom: selecteid === "second" ? "1px solid" : "none",
              borderRadius: 0,
              color: selecteid === "second" ? "#1976D2" : "#000",
            }}
            onClick={() => {
              setSelected("second");
            }}
          >
            Business Assignments
          </Button>
        </Box>
        <Divider />
      </Box>
      <Box
        sx={{
          display: selecteid === "first" ? "flex" : "none",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {sabscInfo.map((SubscriptionInfo, index) => {
          return (
            <Subscriptions
              key={index}
              SubscriptionInfo={SubscriptionInfo}
              onEdit={handleEditPlan}
              onDelete={handleDeletePlan}
            />
          );
        })}
      </Box>
      <Box sx={{ display: selecteid === "second" ? "block" : "none", mt: 3 }}>
        <Tables data={all} tableRow={tableRow} />
      </Box>
      <Dialoge
        handleClose={handleClose}
        open={open}
        filed={filed}
        lable={
          mode === "add"
            ? "Create Subscription Plan"
            : "Update Subscription Plan"
        }
        values={formValues}
        onChange={handleChange}
        onSubmit={
          mode === "add" ? handleSubmit : () => handleUpdate(selectedId)
        }
        mode={mode}
      />
    </Stack>
  );
}
