import {
  Container,
  Stack,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";



export default function Header({RestaurantNames}) {
 
  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",

          mb: 1,
        }}
      >
        <Box
          component="img"
          src="src\gatalogs\Images\Test-Logo-Circle-black-transparent.png"
          alt="LOGO"
          sx={{
            width: 100,
            height: "auto",
          }}
        />
        <Typography sx={{textTransform:"uppercase"}}>WELCOME IN {RestaurantNames}</Typography>
      </Box>
    </Box>
  );
}
