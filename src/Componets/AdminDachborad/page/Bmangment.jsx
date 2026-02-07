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
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import Reviws from "./Reviws";
const statusConfig = {
  ACTIVE: {
    label: "ACTIVE",
    color: "success",
  },
  PENDING: {
    label: "PENDING",
    color: "warning",
  },
  REJECTED: { label: "REJECTED", color: "error" },
  CLOSED: { label: "REJECTED", color: "error" },
};
const SubscriptionConfig = {
  Premium: {
    label: "Premium",
    bgcolor: "#F3E8FF",
    color: "#B128DD",
  },

  Standard: {
    label: "Basic",
    bgcolor: "#DBEAFE",
    color: "#1447EA",
  },
};

const filed = [
  { label: "Business Name", name: "BusinessName" },
  {
    label: "Owner",
    name: "Owner",
    type: "select",
    source: "owners",
  },
  {
    label: "Business Type",
    name: "BusinessType",
    type: "select",
    source: "types",
  },
  {
    label: "Plan",
    name: "Plan",
    type: "select",
    source: "plans",
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    options: [
      { value: "ACTIVE", label: "ACTIVE" },
      { value: "PENDING", label: "PENDING" },
      { value: "REJECTED", label: "REJECTED" },
      { value: "CLOSED", label: "CLOSED" },
    ],
  },
  {
    label: "phone number",
    name: "phonenumber",
  },
  {
    label: "the theme",
    name: "theme",
  },
  {
    label: "discription",
    name: "disc",
  },
  {
    label: "address",
    name: "addres",
  },
];
export default function Bmangment() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [mode, setMode] = useState("add");
  const [selectedShowcase, setselectedShowcase] = useState(1);
  const [owners, setOwners] = useState([]);
  const [types, setTypes] = useState([]);
  const [plans, setPlans] = useState([]);
  const [all, setAll] = useState([]);
  const [selectedId, setSelctedId] = useState(null);
  const pendingBusinesses = all.filter(
    (item) => item.busId?.status === "PENDING",
  );

  const acceptedBusinesses = all.filter(
    (item) => item.busId?.status === "ACTIVE",
  );

  const rejectedBusinesses = all.filter(
    (item) => item.busId?.status === "REJECTED",
  );
  const getAllBussnies = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/mangmentBussnies/allbussnise",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAll(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllowner = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) throw new Error("No token");
      const res = await axios.get(import.meta.env.VITE_API_URL + "/owner/allowners", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOwners(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) throw new Error("No token");
      const res = await axios.get(import.meta.env.VITE_API_URL + "/types/getTypes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPlans = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) throw new Error("No token");
      const res = await axios.get(import.meta.env.VITE_API_URL + "/plans/getPlans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBussnies();
    getAllowner();
    getTypes();
    getPlans();
  }, []);
  const selectSource = {
    plans: plans,
    types: types,
    owners: owners,
  };
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/mangmentBussnies/insert",
        {
          name: formData.BusinessName,
          bussnisOwner: formData.Owner, // <--- _id
          type: formData.BusinessType, // <--- _id
          planId: formData.Plan, // <--- _id
          status: formData.status === "PENDING",
          contact: formData.phonenumber,
          theme: { bottomColor: formData.theme },
          addres: formData.addres,
          disc: formData.disc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      setFormData({});
      handleClose();
      getAllBussnies();
    } catch (err) {
      console.log(err);
    }
  };
  // const handeUpdateStatus = async (id, status) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const res = await axios.put(
  //       `${import.meta.env.VITE_API_URL}/mangmentBussnies/updateStatus/${id}`,
  //       {
  //         status: status,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     console.log(res.data);
  //     getAllBussnies();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handelDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this BUSSNINSE?",
    );
    if (!isConfirmed) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/mangmentBussnies/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      getAllBussnies();
    } catch (err) {
      console.log(err);
    }
  };
  const handelUpdate = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const updateData = {
        ...(formData.BusinessName && { name: formData.BusinessName }),
        ...(formData.Owner && { bussnisOwner: formData.Owner }),
        ...(formData.BusinessType && { type: formData.BusinessType }),
        ...(formData.phonenumber && { contact: formData.phonenumber }),
        ...(formData.addres && { adrres: formData.addres }),
        ...(formData.disc && { disc: formData.disc }),
        // ...(formData.status && { isActive: formData.status === "true" }),
        ...(formData.status && { status: formData.status }),
        ...(formData.theme && { theme: { bottomColor: formData.theme } }),
      };

      if (formData.Plan) {
        updateData.planId = formData.Plan;
      }
      console.log(updateData);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/mangmentBussnies/update/${id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(res.data);
      setFormData({});
      handleClose();
      getAllBussnies();
    } catch (error) {
      console.log(error);
    }
  };
  const handelAcceptsOrRejected = async (id, status) => {
    console.log(id);
    console.log(status)
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/mangmentBussnies/acceptedOrRejected/${id}`,
       { status:status},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(res.data);
      getAllBussnies();
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
      header: "Owner",
      render: (row) => row.busId?.bussnisOwner?.name || "not have owner",
    },
    {
      header: "Business Type",
      render: (row) => row.busId?.type?.name || "-",
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
        const status = row.busId?.status;
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
      header: "Actions",
      render: (row) => (
        <>
          {/* <IconButton
            color="primary"
            onClick={() => {
              handeUpdateStatus(row.busId?._id, !row.busId?.isActive);
            }}
          >
            {row.busId?.isActive ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffOutlinedIcon />
            )}
          </IconButton> */}
          <IconButton
            color="warning"
            onClick={() => {
              setSelctedId(row.busId?._id);
              setMode("edit");
              handleClickOpen();
              setFormData({
                BusinessName: row.busId?.name,
                Owner: row.busId?.bussnisOwner?._id,
                BusinessType: row.busId?.type?._id,
                Plan: row.planId?._id,
                // status: row.busId?.isActive ? "true" : "false",
                status: row.busId?.status,
                phonenumber: row.busId?.contact,
                theme: row.busId?.theme?.bottomColor,
                addres: row.busId?.adrres,
                disc: row.busId?.disc,
              });
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              handelDelete(row.busId?._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Stack sx={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
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
          <Typography variant="h5">Businesses Management</Typography>
          <Typography variant="body2">
            Manage all businesses registered on the platform
          </Typography>
        </Box>
        <Button
          startIcon={<AddOutlinedIcon />}
          onClick={handleClickOpen}
          variant="contained"
          sx={{ borderRadius: 3 }}
        >
          New Businesses
        </Button>
      </Box>
      <Box
        sx={{
          bgcolor: "#ECECF0",
          borderRadius: 5,
          display: "inline-flex",
          gap: 1,
          p: 0.5,
          width: "fit-content",
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          sx={{
            // all: "unset",
            // fontFamily: "inherit",
            // padding: "6px 24px",
            color: "black",
            px: 3,
            bgcolor: selectedShowcase === 1 ? "#FFFFFF" : null,
            borderRadius: 5,
          }}
          onClick={() => {
            setselectedShowcase(1);
          }}
          disableRipple
        >
          All
        </Button>
        <Button
          disableRipple
          sx={{
            color: "black",
            px: 3,
            bgcolor: selectedShowcase === 2 ? "#FFFFFF" : null,
            borderRadius: 5,
          }}
          onClick={() => {
            setselectedShowcase(2);
          }}
        >
          Pending ( {pendingBusinesses.length} )
        </Button>
        <Button
          disableRipple
          sx={{
            color: "black",
            px: 3,
            bgcolor: selectedShowcase === 3 ? "#FFFFFF" : null,
            borderRadius: 5,
          }}
          onClick={() => {
            setselectedShowcase(3);
          }}
        >
          Accepted ( {acceptedBusinesses.length} )
        </Button>
        <Button
          disableRipple
          sx={{
            color: "black",
            px: 3,
            bgcolor: selectedShowcase === 4 ? "#FFFFFF" : null,
            borderRadius: 5,
          }}
          onClick={() => {
            setselectedShowcase(4);
          }}
        >
          Rejected ( {rejectedBusinesses.length} )
        </Button>
      </Box>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 2,
          borderRadius: 3,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search businesses or owner"
          sx={{
            "& .MuiInputBase-root": {
              height: 45,
              borderRadius: 2,
            },
          }}
        />

        <Button
          startIcon={<FilterAltOutlinedIcon fontSize="large" />}
          variant="outlined"
          sx={{
            whiteSpace: "nowrap",
            height: 45,
            color: "#000",
            borderColor: "#D1D5DC",
            borderRadius: 2,
            mr: "auto",
          }}
        >
          ALL Status
        </Button>
      </Paper>
      {selectedShowcase === 1 && <Tables data={all} tableRow={tableRow} />}

      {selectedShowcase === 2 && (
        <Box>
          {pendingBusinesses.length === 0 ? (
            <Typography variant="h6">No pending businesses</Typography>
          ) : (
            pendingBusinesses.map((item) => {
              return <Reviws status="Pending Review" data={item} handelAcceptsOrRejected={handelAcceptsOrRejected} />;
            })
          )}
        </Box>
      )}
      {selectedShowcase === 3 && (
        <Box>
          {acceptedBusinesses.length === 0 ? (
            <Typography variant="h6">No accepted businesses</Typography>
          ) : (
            acceptedBusinesses.map((item) => {
              return <Reviws status="Accepted Review" data={item} />;
            })
          )}
        </Box>
      )}
      {selectedShowcase === 4 && (
        <Box>
          {rejectedBusinesses.length === 0 ? (
            <Typography variant="h6">No rejected businesses</Typography>
          ) : (
            rejectedBusinesses.map((item) => {
              return <Reviws status="Rejected Review" data={item} />;
            })
          )}
        </Box>
      )}
      <Dialoge
        handleClose={handleClose}
        open={open}
        filed={filed}
        lable={mode === "add" ? "New Businesses" : "update Businesses"}
        selectSource={selectSource}
        values={formData}
        onChange={handleChange}
        onSubmit={
          mode === "add" ? handleSubmit : () => handelUpdate(selectedId)
        }
        mode={mode}
      />
    </Stack>
  );
}
