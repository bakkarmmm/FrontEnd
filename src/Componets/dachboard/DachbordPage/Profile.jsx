import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useEffect, useState } from "react";
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from "@mui/material/CircularProgress";
export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [updateding,setUpdateding] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [originalData, setOriginalData] = useState({
  name: "",
  phone: "",
});
  const userInforamtion = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/users/pofile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFormData({ name: res.data.name, phone: res.data.phone });
      setOriginalData({ name: res.data.name, phone: res.data.phone });
    } catch (err) {
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };
  const updateInforamtion = async () => {
    setUpdateding(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.put(
        import.meta.env.VITE_API_URL + "/users/UpdateUser",formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data)
    } catch (err) {
      setError("Failed to fetch user");
    } finally {
      setUpdateding(false);
    }
  };
  useEffect(() => {
    userInforamtion();
  }, []);
  const isChanged = formData.name !== originalData.name || formData.phone !== originalData.phone;

  return (
    <Box
      sx={{ height: "100vh", display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Box>
        <Typography sx={{ fontWeight: "bold" }} variant="h5">
          Profile Settings
        </Typography>
        <Typography variant="body2">
          Manage profile information and settings
        </Typography>
      </Box>
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <Paper
          sx={{
            p: 1,
            borderRadius: 3,
            boxShadow: "none",
            border: "1px solid #00000018",
          }}
        >
          <Box sx={{ mx: 1 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="body1">
              Personal Information
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Update personal details
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }} component="form" onSubmit={updateInforamtion}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                fullWidth
                required
                label="Email Addrres"
                value={formData.name}
                onChange={(e)=> setFormData({ ...formData, name: e.target.value }) }
                sx={{
                  my: 1,
                  "& .MuiInputBase-fullWidth": {
                    height: 40,
                    backgroundColor: "#f3f4f6",
                    borderRadius: 2,
                  },
                  "& .MuiInputLabel-root": {
                    top: -4, // تعديل بسيط إذا احتجت ضبط مكان اللابل
                    my: "auto",
                  },
                }}
              />
              <TextField
                fullWidth
                required
                label="Phone Number"
                value={formData.phone}
                onChange={(e)=> setFormData({ ...formData, phone: e.target.value }) }
                sx={{
                  my: 1,
                  "& .MuiInputBase-fullWidth": {
                    height: 40,
                    backgroundColor: "#f3f4f6",
                    borderRadius: 2,
                  },
                  "& .MuiInputLabel-root": {
                    top: -4,
                    my: "auto",
                  },
                }}
              />
            </Box>
            <Box sx={{ textAlign: "right", my: 1 }}>
              <Button
               disabled={!isChanged }
                variant="contained"
                sx={{ borderRadius: 3, textTransform: "capitalize" }}
                type="submit"
              >
                {updateding ? <CircularProgress size={20} color="inherit" /> : <SaveIcon/> }
                update profile information
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      <Box
        sx={{
          bgcolor: "#FFF7ED",
          p: 2,
          border: "0.3px solid #f54a005e",
          borderRadius: 3,
          display: "flex",
          gap: { xs: 1, md: 3 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <ErrorOutlineIcon fontSize="large" sx={{ color: "#F54900" }} />
        </Box>
        <Typography sx={{ color: "#F54900", fontWeight: "bold", my: "auto" }}>
          Please for change the password contact the Admin
        </Typography>
      </Box>
    </Box>
  );
}
