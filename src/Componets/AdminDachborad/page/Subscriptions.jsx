import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
export default function Subscriptions({ SubscriptionInfo,onEdit,onDelete}) {
  return (
    <Paper sx={{ width: { xs: "100%", md: "33%" }, mt: 3, height: "500px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
        <Typography>{SubscriptionInfo.name}</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton onClick={()=>{
            onEdit(SubscriptionInfo);
          }}><EditOutlinedIcon sx={{ color: "#155DFC" }}/></IconButton>
          <IconButton onClick={()=>{
            onDelete(SubscriptionInfo._id)
          }}><DeleteIcon sx={{ color: "#E7000B" }} /></IconButton>
        </Box>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ mx: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h4">{SubscriptionInfo.price}$</Typography>
          <Typography variant="body2" sx={{ alignSelf: "flex-end" }}>
            /month
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mx: 2, mt: 3 }}>
        {SubscriptionInfo.features.map((advs, index) => {
          return (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 3, mb: 1 }}
            >
              <CheckOutlinedIcon sx={{ color: "#02A73F" }} />
              <Typography variant="body2">{advs}</Typography>
            </Box>
          );
        })}
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Typography>Active subscriptions</Typography>
        <Typography>45</Typography>
      </Box>
    </Paper>
  );
}
