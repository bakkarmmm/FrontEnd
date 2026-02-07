import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slide from "@mui/material/Slide";
import { Box, Chip, Stack } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useCart } from "../CartContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardDaitls({ handleClose, open, data }) {
  const {
    cart,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    decreaseQty,
    totalPrice,
  } = useCart();
  const [qty, setQty] = React.useState(1);
  const increase = () => setQty((q) => q + 1);

  const decrease = () => {
    if (qty > 1) setQty((q) => q - 1);
  };
  const handleAddToCart = () => {
    addToCart({ ...data, qty });
    setQty(1);
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar sx={{ position: "sticky", backgroundColor: "#fff" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="#000"
            onClick={handleClose}
            aria-label="close"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, color: "#000" }}
            variant="h6"
            component="div"
          >
            Back To home
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: { xs: "90%", md: "80%" },
            mx: "auto",
            my: "50px",
            gap: 2,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: 300, md: 450 },
            }}
            image="https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NjY2MjE4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Live from space album cover"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xm: "100%", md: "50%" },
              gap: 2,
            }}
          >
            <CardContent sx={{ width: "100%" }}>
              <Chip
                label="Hot Drinks"
                sx={{
                  bgcolor: "rgba(0,166,62,0.12)",
                  color: "rgba(0,166,62,1)",
                  fontSize: "0.75rem",
                  px: 1,
                  borderRadius: "999px",
                }}
              />
              <Typography variant="body1" sx={{ mt: 1 }}>
                {data.name}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.5, mt: 1 }}>
                {data.discription}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {data.price}
              </Typography>
            </CardContent>
            <Divider />

            <Box sx={{ ml: 3 }}>
              <Typography variant="h5">Product Ditalis</Typography>
              <Box component="ul" sx={{ opacity: 0.5 }}>
                {Array.isArray(data.subDisc) &&
                  data.subDisc.map((disc) => {
                    return (
                      <Typography component="li" key={disc.id}>
                        {disc.text}
                      </Typography>
                    );
                  })}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                ml: 3,
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ opacity: 0.5 }}>
                Qauntity
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  backgroundColor: "#f6f3f4",
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                }}
              >
                <IconButton
                  sx={{
                    height: 26,
                    width: 26,
                    borderRadius: "50%",
                    border: "1px solid #E5E7EB",
                  }}
                  onClick={decrease}
                >
                  -
                </IconButton>
                <Typography>{qty}</Typography>
                <IconButton
                  sx={{
                    height: 26,
                    width: 26,
                    borderRadius: "50%",
                    border: "1px solid #E5E7EB",
                  }}
                  onClick={increase}
                >
                  +
                </IconButton>
              </Box>
            </Box>
            <Button
              size="small"
              variant="contained"
              sx={{
                py: 1,
                m: 2,

                textTransform: "capitalize",
                backgroundColor: "rgba(0,166,62,1)",
              }}
              onClick={handleAddToCart}
            >
              Add 1 to Cart - {qty*data.price} $
            </Button>
          </Box>
        </Card>
      </Box>
    </Dialog>
  );
}
