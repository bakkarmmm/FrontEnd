import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { data, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState("")
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username, password })
      });
    
      const data = await res.json();
    
      if (res.ok ) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
      
        if (data.role === "admin" ) {
          navigate("Admindachboard");
        } else {
          navigate("dachboard");
        }
      } else {
        console.error("Login failed:", data.message || "Invalid credentials");
        setMessage(data.message)
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  return (
    <Container maxWidth="sm">
      {/* <Container maxWidth={false} sx={{bgcolor:"#E9F0FF"}}></Container> */}
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
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"flex-start",width:'100%'}}>
        <Typography sx={{color:"red"}}>{message}</Typography>
        </Box>
        <Link component={RouterLink} to="/register">Not have account?</Link>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "100%", backgroundColor: "rgba(0,166,62,1)" }}
        >
          LOGIN
        </Button>
        
      </Box>
    </Container>
  );
}
