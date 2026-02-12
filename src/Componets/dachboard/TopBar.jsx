import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

export default function TopBar({ onDrawerToggle ,name }) {
  return (
    <AppBar

      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor:"#fff",
        color:"#000",
        boxShadow:"none",
        borderBottom:"1px solid #E0E0E0",
        display:{xs:"block",md:"none"}
        
      }}
    >
      <Toolbar sx={{ minHeight: 0 }}>
  
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div">
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}