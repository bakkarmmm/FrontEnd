import { Box, Paper, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
export default function Rejected() {
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
        <CloseIcon
          sx={{
            fontSize: 40,
            color: "#9F0712",
            bgcolor: "#FEF2F2",
            p: 2,
            borderRadius: "50%",
            my: 2,
          }}
        />
        <Typography variant="h6" sx={{ mb: 1, letterSpacing: 1 }}>
          Registration Not accepted!
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", opacity: 0.9, p: 2 }}
        >
          Your business is REJECTED please contact admin To find out why
        </Typography>
      </Paper>
    </Box>
  );
}
