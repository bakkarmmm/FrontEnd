import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useEffect, useState } from "react";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CreateBussnise() {
  const [plans, setPlans] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const steps = ["Business Info", "Select Plan", "Payment"];
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    contact: "",
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const getMyBussnises = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");
        const [Dres, Tres] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/plans/getPlans", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(import.meta.env.VITE_API_URL + "/types/getTypes"),
        ]);
        setPlans(Dres.data);
        setTypes(Tres.data);
        // const bu = Dres.data[0];
        // setFormData({
        //   name: bu.name || "",
        //   type: bu.type?._id || "",
        //   disc: bu.disc || "",
        //   contact: bu.contact || "",
        //   address: bu.adrres || "",
        // });
      } catch (err) {
        setError("Failed to fetch bussnises");
      } finally {
        setLoading(false);
      }
    };
    getMyBussnises();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("contact", formData.contact);
    data.append("plan", selectedPlan._id);
    data.append("image", image); 
      const token = localStorage.getItem("token");
      const re = await axios.post(
        import.meta.env.VITE_API_URL + "/dachboard/addBussnise",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
             "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(formData);
      console.log(re.data);
      navigate("/pending",{ replace: true })
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box direction={"column"} sx={{ bgcolor: "#E9F0FF", pb: 5 }}>
      <Box sx={{ textAlign: "center" }}>
        <AddBusinessOutlinedIcon
          sx={{
            fontSize: 40,
            color: "#FFFFFF",
            bgcolor: "#4F39F6",
            borderRadius: "50%",
            p: 1.5,
            mt: 5,
          }}
        />
        <Typography variant="h4">Register Your Business</Typography>
        <Typography variant="body1">
          Complete the steps below to get started
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          mx: { xs: "10px", md: "20%" },
          mt: 2,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            bgcolor: "#4F39F6",
            borderRadius: "50%",
            p: "10px",
            width: "20px",
            height: "20px",
            m: "auto",
            color: "#fff",
          }}
        >
          1
        </Typography>
        <Divider
          sx={{
            width: {
              xs: "100px",
              md: "200px",
              borderColor:
                currentStep === 1 || currentStep === 2 ? "#4F39F6" : "#D1D5DC",
            },
            borderBottomWidth: 4,
          }}
        />
        <Typography
          sx={{
            textAlign: "center",
            bgcolor:
              currentStep === 1 || currentStep === 2 ? "#4F39F6" : "#D1D5DC",
            borderRadius: "50%",
            p: "10px",
            width: "20px",
            height: "20px",
            m: "auto",
            color: currentStep === 1 || currentStep === 2 ? "#fff" : "#000",
          }}
        >
          2
        </Typography>
        <Divider
          sx={{
            width: {
              xs: "100px",
              md: "200px",
              borderColor: currentStep === 2 ? "#4F39F6" : "#D1D5DC",
            },
            borderBottomWidth: 4,
          }}
        />
        <Typography
          sx={{
            textAlign: "center",
            bgcolor: currentStep === 2 ? "#4F39F6" : "#D1D5DC",
            borderRadius: "50%",
            p: "10px",
            width: "20px",
            height: "20px",
            m: "auto",
            color: currentStep === 2 ? "#fff" : "#000",
          }}
        >
          3
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          mx: { xs: "10px", md: "15%" },
          mt: 5,

          p: 3,
          boxShadow: 3,
          borderRadius: 5,
          bgcolor: "#FFFFFF",
        }}
      >
        <Box sx={{ display: currentStep === 0 ? "block" : " none" }}>
          <Typography variant="h6">Business Information</Typography>
          <TextField
            fullWidth
            label="Store Name"
            name="storeName"
            value={formData.name}
            margin="normal"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          </Box>
        </Box>
        <Box sx={{ display: currentStep === 1 ? "block" : " none" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Select your Plan
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: { xs: "column", md: "row" },
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {plans.map((plan) => {
              return (
                <Box
                  sx={{ width: { xs: "100%", md: "30%" } }}
                  key={plan._id}
                  onClick={() => {
                    setSelectedPlan(plan);
                  }}
                >
                  <Paper
                    sx={{
                      minHeight: "250px",
                      p: 3,
                      boxShadow: 0,
                      border: "2px solid #D1D5DC",
                      bgcolor: selectedPlan._id === plan._id ? "#EEF2FF" : null,
                      transition: "0.3s",
                      borderRadius: 4,
                      ":hover": { borderColor: "#A3B3FF", cursor: "pointer" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">{plan.name}</Typography>
                      <CheckCircleIcon
                        sx={{
                          color: "#4F39F6",
                          fontSize: "30px",
                          display:
                            selectedPlan._id === plan._id ? "block" : "none",
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="h4">{plan.price}</Typography>
                      <Typography variant="body1">$/month</Typography>
                    </Box>
                    {plan.features.map((feature, index) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mt: 2,
                          }}
                        >
                          <CheckIcon
                            sx={{ color: "#40D67C", fontSize: "16px" }}
                          />
                          <Typography variant="body1" sx={{ fontSize: "14px" }}>
                            {feature}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Paper>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ display: currentStep === 2 ? "block" : " none" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Payment Information
          </Typography>
          <Box
            sx={{
              bgcolor: "#EEF2FF",
              p: 2,
              borderRadius: 4,
              border: "1px solid #D1D5DC",
              mb: 3,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#312CA0", fontWeight: "bold", my: 1 }}
            >
              Selected Plan: {selectedPlan.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#312CA0", fontWeight: "bold", my: 1 }}
            >
              {selectedPlan.price} $/month
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#FEFCE8",
              p: 2,
              borderRadius: 4,
              border: "1px solid #FFF085",
              mb: 3,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#733e0a", fontWeight: "bold", my: 1 }}
            >
              Payment Instructions:
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              <Typography
                component="li"
                sx={{ color: "#733e0a", fontSize: "14px" }}
              >
                Pay the amount in Dolars Pounds (USD) by WICH MONEY
              </Typography>
              <Typography
                component="li"
                sx={{ color: "#733e0a", fontSize: "14px" }}
              >
                Take a clear photo of the money/payment receipt.
              </Typography>
              <Typography
                component="li"
                sx={{ color: "#733e0a", fontSize: "14px" }}
              >
                Upload the photo below
              </Typography>
              <Typography
                component="li"
                sx={{ color: "#733e0a", fontSize: "14px" }}
              >
                Our team will verify your payment within 24-48 hours
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              sx={{
                border: "2px dashed #cbd5e1",
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
          </Box>
        </Box>
        <Box
          sx={{
            display: currentStep === 2 ? "none" : "none",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Create Your Store
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            sx={{
              borderRadius: 3,
              py: 1,
              px: 2,
              border: "1px solid #D1D5DC",
              color: "#364153",
            }}
            variant="outlined"
            disabled={currentStep === 0}
            onClick={() => {
              handleBack();
            }}
          >
            back
          </Button>
          <Button
            sx={{
              borderRadius: 3,
              py: 1,
              px: 2,
              bgcolor: "#4F39F6",
              display: currentStep === 2 ? "none" : "block",
            }}
            variant="contained"
            disabled={
              !(formData.name && formData.type && formData.contact) ||
              (currentStep === 1 && !selectedPlan._id) ||
              (currentStep === 2 && !image)
            }
            onClick={() => {
              handleNext();
            }}
          >
            {currentStep === 0 ? "Next Step" : "Continue to paymant"}
          </Button>
          <Button
            sx={{
              display: currentStep === 2 ? "block" : "none",
              borderRadius: 3,
              py: 1,
              px: 2,
              bgcolor: "#4F39F6",
            }}
            type="submit"
            disabled={!image}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit Registeration
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
