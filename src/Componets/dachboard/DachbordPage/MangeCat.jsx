import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AddIcon from "@mui/icons-material/Add";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
// const Categorie = [
//   { id: 1, name: "drinks", hide: true },
//   { id: 2, name: "cook", hide: false },
// ];

export default function MangeCat() {
  const [open, setOpen] = useState(false);
  const [openUpdate, stOpenUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [Categorie, setCategorie] = useState([]);
  const [newCategorie, setNewCategorie] = useState("");
  const getCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/categories/getCategories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategorie(res.data.categories);
    } catch (err) {
      setError("Failed to fetch bussnises");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const handelAddCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/categories/insertCategorie",
        { name: newCategorie },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCategories();
    } catch (error) {
      setError("Failed to add category");
    } finally {
      setLoading(false);
    }
  };
  const handelUpdate = async (id, name) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/categories/update/${id}`,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCategories();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handelupdateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/categories/update-status/${id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCategories();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCategoire = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Categorie?"
    );
    if (!isConfirmed) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/categories/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getCategories();
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedId, setSelectedId] = useState("");
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Categoris
          </Typography>
          <Typography variant="body2">
            Organize your items into categories
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Category
        </Button>
      </Box>
      <Paper
        sx={{ p: { xs: 1, md: 5 }, mb: 1, display: open ? "block" : "none" }}
      >
        <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
          Category Name
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 2,
            alignItems: { md: "center" },
          }}
        >
          <TextField
            fullWidth
            placeholder="New Categorie"
            onChange={(e) => setNewCategorie(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                height: 50,
                borderRadius: 2,
              },
            }}
          />

          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button
              variant="contained"
              sx={{ height: { xm: 30, md: 50 }, borderRadius: 2 }}
              onClick={() => {
                setOpen(false);
                handelAddCategories();
              }}
            >
              Add
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, height: { xm: 30, md: 50 } }}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancle
            </Button>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{
          p: { xs: 1, md: 5 },
          mb: 1,
          display: openUpdate ? "block" : "none",
        }}
      >
        <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
          Category Name
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 2,
            alignItems: { md: "center" },
          }}
        >
          <TextField
            fullWidth
            placeholder="New Categorie"
            onChange={(e) => setNewCategorie(e.target.value)}
            value={newCategorie ?? ""}
            sx={{
              "& .MuiInputBase-root": {
                height: 50,
                borderRadius: 2,
              },
            }}
          />

          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button
              variant="contained"
              sx={{ height: { xm: 30, md: 50 }, borderRadius: 2 }}
              onClick={() => {
                stOpenUpdate(false);
                handelUpdate(selectedId, newCategorie);
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, height: { xm: 30, md: 50 } }}
              onClick={() => {
                stOpenUpdate(false);
              }}
            >
              Cancle
            </Button>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{
          height: 150,
          display: Categorie.length ? "none" : "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          mb: 1,
        }}
      >
        <FolderOutlinedIcon fontSize="large" sx={{ opacity: 0.5 }} />
        <Typography variant="body1" sx={{ opacity: 0.5 }}>
          No categories yet. Create your first category to get started.
        </Typography>
      </Paper>
      <Paper
        sx={{
          display: Categorie.length ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        {Categorie.map((item) => {
          return (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
                px: 2,
                borderBottom: "1px solid rgba(128, 124, 124, 0.5)",
                "&:hover": { backgroundColor: "rgb(243, 243, 243)" },
              }}
            >
              <Typography>{item.name}</Typography>
              <Box>
                <IconButton  onClick={()=>{handelupdateStatus(item._id,!item.isActive)}}>
                  {!item.isActive ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => {
                    setOpen(false);
                    stOpenUpdate(true);
                    setSelectedId(item._id);
                    setNewCategorie(item.name);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={()=>{deleteCategoire(item._id)}}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Paper>
    </Box>
  );
}
