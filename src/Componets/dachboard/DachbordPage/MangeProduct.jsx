import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

import AddIcon from "@mui/icons-material/Add";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Form from "./form";

// const Categorie = [
//   { id: 1, name: "drinks", hide: true },
//   { id: 2, name: "cook", hide: false },
// ];
export default function MangeProduct() {
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };
  const [products, setProduct] = useState([]);
  const [Categorie, setCategorie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingP, setLoadingP] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingStatusId,setsavingStatusId] = useState(null)
  const [error, setError] = useState("");
  const getCategories = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/categories/getCategories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCategorie(res.data.categories);
    } catch (err) {
      setError("Failed to fetch bussnises");
    } finally {
      setLoading(false);
    }
  };
  const getProducts = async () => {
    setLoadingP(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/productsbussnins/getProducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProduct(res.data.items);
    } catch (err) {
      setError("Failed to fetch items");
    } finally {
      setLoadingP(false);
    }
  };
  useEffect(() => {
    getCategories();
    getProducts();
  }, []);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.gategoryID === selectedCategory)
    : products;
  const [productName, setProductName] = useState("");
  const [productCategorie, setproductCategorie] = useState("");
  const [disc, setDsic] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    if (!image) {
      handleClickSnack();
      setMessage("Please add Image for create!");
      return;
    }
    setSaving(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("disc", disc);
    formData.append("categoriesId", productCategorie);
    formData.append("image", image.file);

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/productsbussnins/newProducts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Product added:", res.data);
      // alert("");
      handleClickSnack();
      setMessage("Product added successfully!");
      setPrice("");
      setDsic("");
      (setproductCategorie(""), setProductName(""), setImage(""));
      getProducts();
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  const handeDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?",
    );
    if (!isConfirmed) return;
    const token = localStorage.getItem("token");
    console.log(id);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/productsbussnins/delete/${id}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      handleClickSnack();
      setMessage("Product Delete successfully!");
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const handelUpdate = async (id, e) => {
    const token = localStorage.getItem("token");
    setSaving(true);
    if (!image) {
      handleClickSnack();
      setMessage("Please add Image for create!");
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("disc", disc);
    formData.append("categoriesId", productCategorie);
    if (image?.file) {
      formData.append("image", image.file);
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/productsbussnins/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `bearer ${token}`,
          },
        },
      );
      handleClickSnack();
      setMessage("Product updated successfully!");
      setPrice("");
      setDsic("");
      (setproductCategorie(""), setProductName(""), setImage(""));
      getProducts();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    setsavingStatusId(id)
    console.log(id);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/productsbussnins/update-status/${id}`,
        { status: status },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      handleClickSnack();
      setMessage("Product Updated status successfully!");
      getProducts();
    } catch (error) {
      console.log(error);
    } finally{
      setsavingStatusId(null)
    }
  };
  const [mode, setMode] = useState("add");
  const [selectedId, setSetlectId] = useState(null);
  if (loading) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress size={20} />
      </Box>
    );
  }
  return (
    <Box sx={{ m: 0 ,height:"100vh"}}>
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
            Products
          </Typography>
          <Typography variant="body2">
            Manage your products and services
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpen(true);
            setMode("add");
          }}
        >
          Add Products
        </Button>
      </Box>
      <Box sx={{ overflowX: "auto", width: "100%", pb: 1 }}>
        {loading ? (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={20} />
          </Box>
        ) : (
          <Stack direction={"row"} gap={2} sx={{ flexWrap: "nowrap" }}>
            <Button
              variant={selectedCategory === null ? "contained" : "outlined"}
              sx={{
                borderRadius: 3,
                py: 1,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {Categorie.map((item) => {
              return (
                <Button
                  key={item._id}
                  variant={
                    selectedCategory === item._id ? "outlined" : "contained"
                  }
                  sx={{
                    borderRadius: 3,
                    py: 1,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    setSelectedCategory(item._id);
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </Stack>
        )}
      </Box>
      <Box direction={"column"} sx={{ display: open ? "block" : "none" }}>
        <Form
          handleSubmit={
            mode === "add" ? handleSubmit : (e) => handelUpdate(selectedId, e)
          }
          setProductName={setProductName}
          setproductCategorie={setproductCategorie}
          productCategorie={productCategorie}
          setDsic={setDsic}
          Categorie={Categorie}
          setPrice={setPrice}
          image={image}
          handleImage={handleImage}
          setImage={setImage}
          setOpen={setOpen}
          mode={mode}
          productname={productName}
          productDisc={disc}
          productprice={price}
          saving={saving}
        />
      </Box>
      {/* desiplay items */}
      {loadingP ? (
        <Box sx={{ textAlign: "center", marginTop: 30 }}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <Box>
          <Paper
            sx={{
              display: Categorie.length ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            {filteredProducts.map((item) => {
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
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {/* `${import.meta.env.VITE_API_URL}/${item.src}` get image from server */}
                    <Paper
                      component="img"
                      src={item.src}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 4, // حواف مستديرة
                        display: { xs: "none", md: "block" },
                        objectFit: "cover", // يحافظ على النسبة
                        boxShadow: 3,
                      }}
                    />
                    <Box>
                      <Typography>{item.name}</Typography>
                      <Typography>{item.price} $</Typography>
                    </Box>
                  </Box>

                  <Box>
                    <IconButton
                      onClick={() => {
                        updateStatus(item._id, !item.isActive);
                      }}
                    >
                      {savingStatusId === item._id ? <CircularProgress size={20} color="inherit"/> : item.isActive ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setOpen(true);
                        setMode("edit");
                        const fullDisc = [
                          item.discription,
                          ...(item.subDisc?.map((d) => d.text) || []),
                        ].join("\n");
                        setSetlectId(item._id);
                        setProductName(item.name);
                        setPrice(item.price);
                        setDsic(fullDisc);
                        setproductCategorie(item.gategoryID);
                        setImage(item.src ? { preview: item.src } : null);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handeDelete(item._id);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </Paper>
          {products.length === 0 && (
            <Paper
              sx={{
                height: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                mb: 1,
                mt: 2,
              }}
            >
              <Inventory2Icon fontSize="large" sx={{ opacity: 0.5 }} />
              <Typography variant="body1" sx={{ opacity: 0.5 }}>
                No products in this category yet. Add your first product to get
                started.
              </Typography>
            </Paper>
          )}
        </Box>
      )}
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message={message}
        action={action}
        
      />
    </Box>
  );
}
