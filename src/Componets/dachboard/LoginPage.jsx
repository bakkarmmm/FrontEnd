import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { data, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
export default function LoginPage() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  
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
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        console.log(data)
        if (data.role === "admin") {
          navigate("Admindachboard");
        } else {
          navigate("dachboard");
        }
      } else {
        console.error("Login failed:", data.message || "Invalid credentials");
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
    minHeight: "100vh",
    bgcolor: "#F9FAFB", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}>
      <Container maxWidth="sm" >
      {/* <Container maxWidth={false} sx={{bgcolor:"#E9F0FF"}}></Container> */}
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          mt: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <AccountCircleSharpIcon
        color="primary"
          // sx={{ fontSize: 200, color: "rgba(0,166,62,1)" }}
          sx={{ fontSize: 200}}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
         
          variant="outlined"
          fullWidth
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Typography sx={{ color: "red" }}>{message}</Typography>
        </Box> */}

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "100%"}}
          disabled={loading}
          onClick={handleClickSnack}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "LOGIN"}
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "right",p:1 }}>
        <Link component={RouterLink} to="/register" sx={{textDecoration:"none",letterSpacing:0.5,fontWeight:"bold"}}>
          Don't have account ?
        </Link>
      </Box>
    </Container>
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
