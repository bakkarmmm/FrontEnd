import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Outlet } from "react-router-dom";
import TopBar from "../dachboard/TopBar";
import LeftBar from "../dachboard/LeftBar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessIcon from '@mui/icons-material/Business';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
const DachboardMenu = [
    {
      id: 1,
      name: "Dashboard",
      icon: <HomeOutlinedIcon />,
      path: "dashboard",
    },
    { id: 2, name: "Businesses Management", icon: <BusinessIcon />, path: "businessesManagement" },
    { id: 3, name: "Business Owners", icon: <PeopleAltOutlinedIcon />, path: "businessOwners" },
    { id: 4, name: "Subscriptions Management", icon: <SubscriptionsOutlinedIcon />, path: "subscriptionsManagement" },
    { id: 10, name: "Payments Management", icon: <PaymentIcon />, path: "paymantsManagment" },
    { id: 5, name: "Business Types", icon: <FolderCopyOutlinedIcon />, path: "businessTypes" },
    { id: 6, name: "System Settings", icon: <SettingsOutlinedIcon />, path: "systemSettings" },
    { id: 7, name: "Log Out", icon: <LogoutOutlinedIcon />, path: "/" },
  ];
const drawerWidth = 240;
export default function SubDach(){
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
    return(
        <Box sx={{ display: "flex",backgroundColor:"#F9FAFB" }}>
      <CssBaseline />
      <TopBar onDrawerToggle={handleDrawerToggle} name={"System Administration"}  />
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          maxWidth: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "hidden",
        }}
      >
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
    )
}