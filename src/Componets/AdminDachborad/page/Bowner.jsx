import {
  Box,
  Button,
  Chip,
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
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
const statusConfig = {
  active: {
    label: "active",
    color: "success",
  },
  disabled: {
    label: "disabled",
    color: "error",
  },
};

const filed = [
  { label: "Full Name", name: "name" },
  { label: "phone", name: "phone" },
  {
    label: "Password",
    name: "Password",
    type: "password",
  },
];
export default function Bowner() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setMode("add");
  };
  const handleClose = () => {
    setOpen(false);
    setFormValues({
      name: "",
      phone: "",
      Password: "", // عادةً لا نعرض كلمة السر
    }); 
  };
  const [mode, setMode] = useState("add");
  const [selectedId, setSelectedId] = useState(null);
  const [owners, setOwners] = useState([]);
  const getOwners = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) throw new Error("No token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/owner/userswithBusiness",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOwners(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [formValues, setFormValues] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    console.log("FORM DATA 👉", formValues);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/owner/addnewOwner",
        {
          name: formValues.name,
          password: formValues.Password, // <--- _id
          phone: formValues.phone, // <--- _id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      getOwners();
    } catch (err) {
      console.log(err);
    }
  };
  const handelDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this User?"
    );
    if (!isConfirmed) return;
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/owner/deleteUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      getOwners();
    } catch (err) {
      console.log(err);
    }
  };
  const handeUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/owner/updateStatus/${id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      getOwners();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (id) => {
    console.log(id)
    try {
      const token = localStorage.getItem("token");
  
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/owner/updateUser/${id}`,
        {
          name: formValues.name,
          phone: formValues.phone,
          ...(formValues.Password && { password: formValues.Password }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(res.data);
      getOwners();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  const tableRow = [
    { header: "Name", render: (row) => row.name },
    { header: "phone", render: (row) => row.phone },
    {
      header: "Assigned Business",
      render: (row) => row.business?.name || "Not Assigned",
    },
    {
      header: "Joined Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Status",
      render: (row) => {
        const status = row.isActive ? "active" : "disabled";
        const config = statusConfig[status];

        return (
          <Chip
            label={config.label}
            color={config.color}
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
          <IconButton
            color="primary"
            onClick={() => {
              handeUpdateStatus(row._id, !row.isActive);
            }}
          >
            {row.isActive ? <VisibilityIcon /> : <VisibilityOffOutlinedIcon />}
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              handleClickOpen();
              setMode("edit");
              setSelectedId(row._id);
              setFormValues({
                name: row.name,
                phone: row.phone,
                Password: "", // عادةً لا نعرض كلمة السر
              });
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              handelDelete(row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  useEffect(() => {
    getOwners();
  }, []);
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
          <Typography variant="h5">Business Owners Accounts</Typography>
          <Typography variant="body2">
            Manage business owner accounts and permissions
          </Typography>
        </Box>
        <Button
          startIcon={<AddOutlinedIcon />}
          onClick={handleClickOpen}
          variant="contained"
          sx={{ borderRadius: 3 }}
        >
          Create Owner Account
        </Button>
      </Box>

      <Tables data={owners} tableRow={tableRow} />
      <Dialoge
        handleClose={handleClose}
        open={open}
        filed={filed}
        lable={mode === "add" ? "Create Owner Account" : "Update Owner Account"}
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
