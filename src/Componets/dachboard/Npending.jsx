import { Box, Paper, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
export default function Npending() {
  return (
    <Box
      direction={"column"}
      sx={{ backgroundColor: "#E4ECFF", pt: 6, height: "100vh" }}
    >
      <Paper
        sx={{
          mx: { xs: 2, md: 42 },
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <CheckIcon
          sx={{
            fontSize: 40,
            color: "#16a34a",
            bgcolor: "#DBFCE7",
            p: 2,
            borderRadius: "50%",
            my: 2,
          }}
        />
        <Typography variant="h6" sx={{ mb: 1, letterSpacing: 1 }}>
          Registration Successful!
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", opacity: 0.9, p: 2 }}
        >
          Your business registration has been submitted. We will review your
          payment and contact you within 24-48 hours.
        </Typography>
      </Paper>
    </Box>
  );
}
