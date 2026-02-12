import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import {  useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [loading, setLoading] = useState(false);
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return "";
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username, password, phone }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          navigate("/Admindachboard");
        } else {
          navigate("/", { replace: true });
        }
      } else {
        console.error("Login failed:", data.message || "Invalid credentials");
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  };
  return (
    <Box 
      sx={{
    minHeight: "100vh",
    bgcolor: "#F9FAFB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
    >
      <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <AccountCircleSharpIcon
        color="primary"
          sx={{ fontSize: 200  }}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="phone number"
          type="text"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          error={password !== "" && validatePassword(password) !== ""}
          helperText={password !== "" && validatePassword(password)}
          
        />
        <TextField

          label="Confirm Password"
          type={showPasswordC ? "text" : "password"}
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPasswordC(!showPasswordC)}
                  edge="end"
                >
                  {showPasswordC ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={confirmPassword && password !== confirmPassword}
          helperText={
            confirmPassword && password !== confirmPassword
              ? "Passwords do not match"
              : ""
          }
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Typography sx={{ color: "red" }}>{message}</Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "100%" }}
          disabled={confirmPassword && password !== confirmPassword }
        >
          {loading ? <CircularProgress size={20} color="inherit"/>:"Create Account"}
          
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "right", p: 1 }}>
        <Link
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            letterSpacing: 0.5,
            fontWeight: "bold",
          }}
        >
          Have account ?
        </Link>
      </Box>
    </Container>
    </Box>
  );
}
