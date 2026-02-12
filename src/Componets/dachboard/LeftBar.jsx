import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useState } from "react";
const drawerWidth = 240;
const LoGout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  window.location.href = "/";
};

export default function LeftBar({
  mobileOpen,
  onClose,
  onTransitionEnd,
  DachboardMenu,
}) {
  const navigation = useNavigate();
  const location = useLocation();
  const [bColor, setBcolor] = useState(1);
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={onTransitionEnd}
        onClose={onClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        slotProps={{
          root: {
            keepMounted: true,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            textAlign: "center",
            mx: 3,
            my: 1,
            gap: 3,
          }}
        >
          <Box
            sx={{
              bgcolor: "#4F39F6",
              borderRadius: 3,
              width: "40px",
              height: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StorefrontIcon sx={{ fontSize: "30px", color: "white" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              My Store
            </Typography>
            <Typography sx={{ fontSize: "14px", opacity: 0.9 }}>
              {localStorage.getItem("name")}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <List>
          {DachboardMenu.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigation(item.path);
                  onClose(false);
                  setBcolor(item.id);
                  if (item.name === "Log Out") {
                    LoGout();
                  }
                }}
                sx={{
                  bgcolor: bColor === item.id ? "#EEF2FF" : "transparent",
                  color: bColor === item.id ? "#4F39F6" : "inherit",
                  borderRadius: 2,
                  mx: 1,
                  "& .MuiListItemIcon-root:hover, .MuiTypography-root:hover": {
                    bgcolor: bColor === item.id ? "#EEF2FF" : "transparent",
                    color: bColor === item.id ? "#4F39F6" : "inherit",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: bColor === item.id ? "#4F39F6" : "inherit" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            textAlign: "center",
            mx: 3,
            my: 1,
            gap: 3,
          }}
        >
          <Box
            sx={{
              bgcolor: "#4F39F6",
              borderRadius: 3,
              width: "40px",
              height: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StorefrontIcon sx={{ fontSize: "30px", color: "white" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              My Store
            </Typography>
            <Typography sx={{ fontSize: "14px", opacity: 0.9 }}>
              {localStorage.getItem("name")}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <List>
          {DachboardMenu.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigation(item.path);
                  setBcolor(item.id);
                }}
                sx={{
                  bgcolor: bColor === item.id ? "#EEF2FF" : "transparent",
                  color: bColor === item.id ? "#4F39F6" : "inherit",
                  borderRadius: 2,
                  mx: 1,
                  "& .MuiListItemIcon-root:hover, .MuiTypography-root:hover": {
                    bgcolor: bColor === item.id ? "#EEF2FF" : "transparent",
                    color: bColor === item.id ? "#4F39F6" : "inherit",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: bColor === item.id ? "#4F39F6" : "inherit" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
