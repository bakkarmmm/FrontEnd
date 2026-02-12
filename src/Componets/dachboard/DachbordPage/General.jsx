import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function General() {
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [error, setError] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
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
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    disc: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    const getMyBussnises = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");
        const [Dres, Tres] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/dachboard/dachboard/my", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(import.meta.env.VITE_API_URL + "/types/getTypes"),
        ]);

        setData(Dres.data);
        setTypes(Tres.data);
        const bu = Dres.data[0]; // إذا عندك بزنس واحد
        setFormData({
          name: bu.name || "",
          type: bu.type?._id || "",
          disc: bu.disc || "",
          contact: bu.contact || "",
          address: bu.adrres || "",
        });
      } catch (err) {
        setError("Failed to fetch bussnises");
      } finally {
        setLoading(false);
      }
    };

    getMyBussnises();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault(); // يمنع reload
    setLoadingSave(true)
    try {
      const token = localStorage.getItem("token");
      const re = await axios.put(
        import.meta.env.VITE_API_URL + "/dachboard/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(formData);
      console.log(re.data);
      handleClickSnack();
      setMessage("Updated Infomartion successfully!");
    } catch (err) {
      console.error(err);
      alert("خطأ أثناء الحفظ ❌");
    }finally{
      setLoadingSave(false);
      
    }
  };
   if (loading) {
    return (
      <Box sx={{textAlign:"center"}}>
        <CircularProgress size={30} />
      </Box>
    );
  }
  return (
    <Box direction={"column"} sx={{height:"100vh"}}>
      <Typography sx={{ fontWeight: "bold" }} variant="h5">
        Store Settings
      </Typography>
      <Typography variant="body2">
        Manage your store information and business details
      </Typography>
      {data.map((buData) => {
        return (
          <Box
            key={buData._id}
            component="form"
            sx={{
              mx: "auto",
              mt: 5,
              p: 3,
              boxShadow: 1 ,
              
              borderRadius: 2,
              bgcolor:"white"
            }}
          >
            <TextField
              fullWidth
              label="Store Name"
              name="storeName"
              value={formData.name}
              margin="normal"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Business Type</InputLabel>
              <Select
                label="Business Type"
                value={formData.type}
                name="type"
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                {types.map((type) => {
                  return (
                    <MenuItem key={type._id} value={type._id}>
                      {type.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={formData.disc}
              onChange={(e) =>
                setFormData({ ...formData, disc: e.target.value })
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 0, md: 2 },
              }}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                margin="normal"
                required
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Whatssap Number"
                name="whatssapNumber"
                margin="normal"
                required
                value={formData.contact}
              />
            </Box>
            <TextField
              fullWidth
              label="Address"
              name="address"
              margin="normal"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                disabled={loadingSave}
                startIcon={<SaveOutlinedIcon />}
              >
                {loadingSave ? <CircularProgress size={20} color="inherit"/> : " Save Change"}
               
              </Button>
            </Box>
          </Box>
        );
      })}
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
