import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";

import CardDaitls from "./CardDaitls";
import { useCart } from "../CartContext";
import { useState } from "react";

export default function Crd({ data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 const {  addToCart } = useCart();
 
  return (
    <Card sx={{ width: { xs: "90%", sm: "45%", md: 280 } }}>
      <CardMedia sx={{ height: 100 }} image={data.src} title="green iguana" />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{ fontWeight: 800 }}
          >
            {data.name}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {data.price} $
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {data.discription}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            textTransform: "capitalize",
            backgroundColor: "rgba(246,243,244,1)",
            color: "#000",
          }}
        >
          View Details
        </Button>
        <Button onClick={() => addToCart(data)}
          size="small"
          variant="contained"
          sx={{
            textTransform: "capitalize",
            backgroundColor: "rgba(0,166,62,1)",
          }}
        >
          Add to Cart
        </Button>
        
      </CardActions>
      <CardDaitls open={open} handleClose={handleClose} data={data}/>
    </Card>
  );
}
