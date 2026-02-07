import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TopBar from "./TopBar";
import LeftBar from "./LeftBar";
import { Outlet } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const drawerWidth = 240;


const DachboardMenu = [
  {
    id: 1,
    name: "Store Settings",
    icon: <HomeOutlinedIcon />,
    path: "general",
  },
  { id: 2, name: "Categoris", icon: <CategoryIcon />, path: "mangecategory" },
  { id: 3, name: "Products", icon: <Inventory2Icon />, path: "mangeproduct" },
  { id: 4, name: "Orders", icon: <ReceiptLongIcon />, path: "cart" },
  { id: 7, name: "Log Out", icon: <LogoutOutlinedIcon />, path: "/" },
];
export default function Dachboard() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar onDrawerToggle={handleDrawerToggle} name="Your Dachboard" />
      <LeftBar
        mobileOpen={mobileOpen}
        onClose={handleDrawerClose}
        onTransitionEnd={handleDrawerTransitionEnd}
        DachboardMenu={DachboardMenu}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },overflowX: "hidden"
          
        }}
      >
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
  );
}
