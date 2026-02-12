import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PaymentIcon from "@mui/icons-material/Payment";
import * as React from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import HttpsIcon from "@mui/icons-material/Https";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Subscription() {
  const [open, setOpen] = React.useState(false);
  const [plans, setPlans] = React.useState([]);
  const [subsc, setsubsc] = React.useState({});
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingData, setLoadingData] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [message, setMessage] = React.useState("");
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFile = (file) => {
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Only PNG, JPG, JPEG allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Max size is 10MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };
  const getPlans = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) throw new Error("No token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/plans/getPlans",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPlans(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSubsc = async () => {
    const token = localStorage.getItem("token");
    setLoadingData(true);
    try {
      if (!token) throw new Error("No token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/subscription/ownerSubsc",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setsubsc(res.data);
      setSelectedPlan(res.data.planId?._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false);
    }
  };
  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("PlanId", selectedPlan);
    formData.append("busId", subsc.busId);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/subscription/renew",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Response:", res.data);
      handleClickSnack();
      setMessage("Payment submitted successfully!");
      
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getPlans();
    getSubsc();
  }, []);
  if (loadingData) {
    return (
      <Box sx={{textAlign:"center"}}>
        <CircularProgress size={30} />
      </Box>
    );
  }
  return (
    <Box sx={{height:"100vh"}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Subscription Management
          </Typography>
          <Typography variant="body2">
            Manage your subscription plan and payment details
          </Typography>
        </Box>
      </Box>
      <Paper sx={{ p: 3, borderRadius: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Current Subscription
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.78 }}>
              Your subscription details and billing information
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "white",
              bgcolor: "#1565C0",
              px: 0.89,
              borderRadius: 3,
              fontSize: "12px",
            }}
          >
            {subsc.status}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <CalendarTodayIcon fontSize="small" sx={{ color: "#717182" }} />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Start Date
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.78 }}>
                  {new Date(subsc.startDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <CalendarTodayIcon fontSize="small" sx={{ color: "#717182" }} />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Next Renewal Date
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.78 }}>
                  {new Date(subsc.endDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <PaymentIcon fontSize="small" sx={{ color: "#717182" }} />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Current Plan
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.78 }}>
                  {subsc.planId?.name} - ${subsc.planId?.price}/month
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button
          startIcon={<PaymentIcon />}
          variant="contained"
          sx={{ mt: 3, borderRadius: 3, textTransform: "capitalize" }}
          onClick={handleClickOpen}
        >
          Renev Payment
        </Button>
      </Paper>
      <React.Fragment>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="xs"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Submit Payment Proof
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography variant="body2" sx={{ opacity: 0.89 }}>
              Upload an image of your payment receipt to renew your Pro
              subscription
            </Typography>
            <Typography sx={{ fontWeight: "bold", mt: 2 }} variant="body2">
              Your Plan
            </Typography>
            <Box>
              <Select
                value={selectedPlan}
                fullWidth
                onChange={(e) => {
                  setSelectedPlan(e.target.value);
                }}
              >
                {plans.map((plan) => {
                  return (
                    <MenuItem key={plan._id} value={plan._id}>
                      {plan.name} - {plan.price} $
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <Typography sx={{ fontWeight: "bold", mt: 1 }} variant="body2">
              Payment Receipt Image
            </Typography>

            <Box
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              sx={{
                border: "2px dashed #cbd5e1",
                my: 0.5,
                borderRadius: 2,
                p: 4,
                minHeight: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                position: "relative",
                textAlign: "center",
                cursor: preview ? "default" : "pointer",
              }}
              component={preview ? "div" : "label"}
            >
              {!preview && (
                <>
                  <input hidden type="file" onChange={handleChange} />

                  <CloudUploadOutlinedIcon
                    sx={{ fontSize: 60, color: "#94a3b8" }}
                  />

                  <Typography sx={{ mt: 1 }} color="primary">
                    Click to upload or drag and drop
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    PNG, JPG, JPEG up to 10MB
                  </Typography>
                </>
              )}

              {preview && (
                <>
                  {/* Remove Button */}
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,

                      width: { xs: "30px", md: "50px" },
                      height: { xs: "30px", md: "50px" },
                      bgcolor: "#ef4444",
                      color: "#fff",
                      ":hover": { bgcolor: "#dc2626" },
                    }}
                  >
                    ✕
                  </IconButton>

                  {/* Image Preview */}
                  <Box
                    component="img"
                    src={preview}
                    alt="preview"
                    sx={{
                      maxHeight: 180,
                      maxWidth: 180,
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />
                </>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 2,
                bgcolor: "#EFF6FF",
                p: 1,
                borderRadius: 3,
              }}
            >
              <HttpsIcon />
              <Typography sx={{ fontSize: "14px" }}>
                Your payment proof will be reviewed within 24 hours
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleClose}
              disableRipple
              sx={{ textTransform: "capitalize", borderRadius: 2 }}
            >
              cancle
            </Button>
            <Button
              disableRipple
              variant="contained"
              disabled={loading}
              onClick={() => {
                handleSubmit();
                setImage(null);
              }}
              sx={{ textTransform: "capitalize", borderRadius: 2 }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit Payment Proof"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
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
