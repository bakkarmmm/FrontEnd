import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { data, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");
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
          navigate("/",{ replace: true });
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
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <AccountCircleSharpIcon
          sx={{ fontSize: 200, color: "rgba(0,166,62,1)" }}
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
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
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
          sx={{ width: "100%", backgroundColor: "rgba(0,166,62,1)" }}
        >
          Create Account
        </Button>
      </Box>
    </Container>
  );
}
