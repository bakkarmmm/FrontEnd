import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Dialoge from "./Dialoge";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BusninessesCard from "./BusninessesCard";
import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const filed = [
  { label: "Type Name", name: "TypeName" },
  { label: "Layout", name: "Layout" },

  { label: "Description", name: "Description", type: "multiline" },
];
// const business = [
//   {
//     id: 1,
//     name: "Technology",
//     disc: "Software, IT services, and tech companies",
//     ActiveBusinesses: 45,
//     Created: "2025-01-15",
//   },
//   {
//     id: 23,
//     name: "Restaurant",
//     disc: "Food service, cafes, and dining establishments",
//     ActiveBusinesses: 32,
//     Created: "2025-01-15",
//   },
//   {
//     id: 32,
//     name: "Retail",
//     disc: "Stores, boutiques, and retail outlets",
//     ActiveBusinesses: 28,
//     Created: "2025-01-20",
//   },
//   {
//     id: 2,
//     name: "Professional Services",
//     disc: "Legal, accounting, consulting firmss",
//     ActiveBusinesses: 13,
//     Created: "2025-01-20",
//   },
// ];
export default function Btype() {
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [formValues, setFormValues] = useState({});
  const [mode, setMode] = useState("add");
  const [all, setAll] = useState([]);
  const [selectId, setSelctedId] = useState(null);
  const [message, setMessage] = useState("");
  const updateId = (id) => {
    setSelctedId(id);
    setMode("edit");
    handleClickOpen();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleGetTypes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.get(import.meta.env.VITE_API_URL + "/types/getTypes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setAll(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    console.log(formValues);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/types/addType",
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      setMessage(res.data);
      handleClickSnack();
      handleClose();
      handleGetTypes();
      setFormValues({});
    } catch (error) {
      console.log(error);
    }
  };
  const HandleDelte = async (id) => {
    const q = window.confirm("Are you sure you want to delete this type?");
    if (!q) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/types/deleteType/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      setMessage(res.data);
      handleClickSnack();
      handleGetTypes();
    } catch (error) {
      console.log(error);
    }
  };
  const HandleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/types/updateType/${id}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      handleClickSnack();
      setMessage(res.data);
      handleClose();
      handleGetTypes();
      setFormValues({});
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetTypes();
  }, []);

  return (
    <Box>
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
          <Typography variant="h5">Business Types Management</Typography>
          <Typography variant="body2">
            Create and manage business categories
          </Typography>
        </Box>
        <Button
          startIcon={<AddOutlinedIcon />}
          onClick={handleClickOpen}
          variant="contained"
          sx={{ borderRadius: 3 }}
        >
          New Businesses Type
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          m: "auto",
        }}
      >
        {all.map((item) => {
          return (
            <BusninessesCard
              key={item._id}
              business={item}
              onEdit={updateId}
              onDelete={HandleDelte}
              setFormValues={setFormValues}
            />
          );
        })}
      </Box>
      <Dialoge
        handleClose={handleClose}
        open={open}
        filed={filed}
        lable={mode === "add" ? "Create Business Type" : "Update Business Type"}
        onSubmit={
          mode === "add"
            ? handleSubmit
            : () => {
                HandleUpdate(selectId);
              }
        }
        onChange={handleChange}
        values={formValues}
        mode={mode}
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message={message}
        action={action}
      />
    </Box>
  );
}
