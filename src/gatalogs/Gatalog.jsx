import { Box, Paper } from "@mui/material";
import Header from "./Header";
import Main from "./main/Main";
import ScroolBar from "./ScroolBar";
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
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CartProvider, useCart } from "./CartContext";
import axios from "axios";
import { useParams } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const gategory = [
//   { id: 1, name: "drinks" },
//   { id: 2, name: "meeer" },
//   { id: 3, name: "fooods" },
//   { id: 4, name: "chips" },
//   { id: 5, name: "goomangods" },
//   { id: 6, name: "gowwwods" },
// ];
export default function Gatalog() {
  // const [gategory, setGategory] = React.useState([]);
  // React.useEffect(() => {
  //   axios
  //     .get(import.meta.env.VITE_API_URL)
  //     .then((res) => {
  //       setGategory(res.data);
  //       // console.log(res);
  //     })
  //     .catch(() => {
  //       console.log("gategory not found not found");
  //     });
  // }, []);
  const { resturantSlug } = useParams();
  const [categories, setcategories] = React.useState([]);
  const [Bname, SetBaname] = React.useState("");
  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${resturantSlug}`)
      .then((res) => {
        // console.log(res)
        setcategories(res.data.categris);
        SetBaname(res.data.RestaurantNames);
      })
      .catch(() => {
        console.log("Restourant not found");
      });
  }, [resturantSlug]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(gategory);
  const {
    cart,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    decreaseQty,
    totalPrice,
  } = useCart();
  const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  const createWhatsAppMessage = (cart) => {
    let message = "\uD83D\uDED2 Order Details:\n\n"; // 🛒 Emoji مضمونة

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.qty}\n`;
      message += `   Price: $${item.price}\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    message += `\uD83D\uDCB0 Total: $${total}`; // 💰 Emoji مضمونة

    return message;
  };

  const sendCartToWhatsApp = () => {
    const cart = getCartFromLocalStorage();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const phoneNumber = "96171682819"; // رقمك مع كود الدولة
    const message = createWhatsAppMessage(cart);

    // 👇 أهم خطوة: encodeURIComponent يضمن ظهور جميع الإيموجي والأسطر
    const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    // افتح الرابط في نافذة جديدة
    window.open(url, "_blank");

    // نظف السلة بعد الإرسال
    removeAllFromCart();
  };

  return (
    <Box>
      <Header RestaurantNames={Bname} />
      <Divider sx={{ opacity: 0.3 }} />
      <Box sx={{ position: "sticky", top: 0, zIndex: 200 }}>
        <ScroolBar gategory={categories} />
      </Box>
      <Box
        sx={{
          px: { xs: 1, sm: 1, md: 10 },
          backgroundColor: "rgba(246,243,244,1)",
          m: 0,
        }}
      >
        {categories.map((item) => {
          return <Main key={item._id} gategory={item} />;
        })}
      </Box>
      {/* cart */}
      <Box>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            position: "fixed",
            bottom: 30,
            right: 20,
            zIndex: 33333,
            borderRadius: "50%",
            width: 50,
            height: 50,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 0,
            backgroundColor: "rgba(0,166,62,1)",
            opacity: 0.67,
          }}
        >
          <ShoppingCartIcon fontSize="large" />
        </Button>
        <Dialog
          fullScreen
          sx={{
            width: { xs: "90%", sm: "70%", md: "50%" },
            maxWidth: "100%",
            minHeight: "60%",
            maxHeight: "80%",
            margin: "auto",
          }}
          open={open}
          onClose={handleClose}
          slots={{
            transition: Transition,
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <AppBar
              sx={{ position: "relative", backgroundColor: "rgba(0,166,62,1)" }}
            >
              <Toolbar sx={{}}>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Your Cart
                </Typography>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Divider />
            <Box
              sx={{
                position: "relative",
                minHeight: "200",
                flexGrow: 1,
                overflowY: "auto",
              }}
            >
              <Typography
                sx={{
                  opacity: 0.5,
                  textAlign: "center",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: cart.length === 0 ? "block" : "none",
                }}
              >
                Your Cart is Embty
              </Typography>
              <Box sx={{ display: cart.length === 0 ? "none" : "block" }}>
                {cart.map((item) => {
                  return (
                    <Paper
                      key={item.name}
                      sx={{
                        p: 2,
                        m: 2,
                        borderRadius: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography>{item.name}</Typography>
                        <Typography>{item.price}$</Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <IconButton
                          onClick={() => {
                            decreaseQty(item.id);
                          }}
                          sx={{
                            height: 32,
                            width: 32,
                            borderRadius: "50%",
                            border: "1px solid #E5E7EB",
                          }}
                        >
                          -
                        </IconButton>
                        <Typography>{item.qty}</Typography>
                        <IconButton
                          sx={{
                            height: 32,
                            width: 32,
                            borderRadius: "50%",
                            border: "1px solid #E5E7EB",
                          }}
                          onClick={() => {
                            addToCart(item);
                          }}
                        >
                          +
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            removeFromCart(item.id);
                          }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Box>
                    </Paper>
                  );
                })}
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mx: 2,
                  mt: 3,
                }}
              >
                <Typography>Total</Typography>
                <Typography>{totalPrice}$</Typography>
              </Box>
              <Button
                onClick={() => {
                  sendCartToWhatsApp();
                }}
                variant="contained"
                size="large"
                sx={{
                  width: "80%",
                  mx: "auto",
                  backgroundColor: "rgba(0,166,62,1)",
                }}
              >
                Order by Whatssap
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
}
