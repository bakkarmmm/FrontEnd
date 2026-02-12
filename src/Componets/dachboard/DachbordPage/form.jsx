import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CircularProgress from "@mui/material/CircularProgress";
import { SaveAltOutlined } from "@mui/icons-material";
export default function Form({
  handleSubmit,
  setProductName,
  setproductCategorie,
  productCategorie,
  setDsic,
  Categorie,
  setPrice,
  image,
  handleImage,
  setImage,
  setOpen,
  mode,
  productname,
  productprice,
  productDisc,
  saving
}) {
   
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography sx={{ fontWeight: "bold" }} variant="h5">
       {mode === "add"? "New Product": "Update Product" }
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 0, md: 2 },
        }}
      >
        <TextField
          fullWidth
          label="Product Name"
          name="productName"
          margin="normal"
          required
          value={productname ?? ""}
          onChange={(e) => setProductName(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            label="Business Type"
            onChange={(e) => setproductCategorie(e.target.value)}
            value={productCategorie?? ""}
          >
            {Categorie.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        onChange={(e) => setDsic(e.target.value)}
        value={productDisc ?? ""}
      />

      <TextField
        fullWidth
        type="number"
        label="Price"
        name="price"
        margin="normal"
        onChange={(e) => setPrice(e.target.value)}
        value={productprice ?? ""}
        inputProps={{
          step: "0.01", // يسمح بالأرقام العشرية
          min: 0,
        }}
        required
      />
      {/* image */}
      <Box>
        {!image && (
          <Box
            component="label"
            sx={{
              width: "100%",
              height: 180,
              border: "2px dashed #ccc",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              mb: 2,
              bgcolor: "#fafafa",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "#f0f7ff",
              },
            }}
          >
            <input hidden type="file" accept="image/*" onChange={handleImage} />

            <Box textAlign="center">
              <AddPhotoAlternateIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="body2">Add product image</Typography>
            </Box>
          </Box>
        )}

        {/* GRID لعرض الصورة (برّا البوكس) */}
        {image && (
          <Grid container spacing={2}>
            <Grid>
              <Box
                sx={{
                  position: "relative",
                  height: 140,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid #ddd",
                }}
              >
                <img
                  src={image.preview}
                  alt="product"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <IconButton
                  size="small"
                  onClick={() => setImage(null)}
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    bgcolor: "white",
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      {/* image */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 2, m: 1 }}
          onClick={() => {
            
          }}
          disabled={saving}
          startIcon={saving ? <CircularProgress size={20}/> : <SaveAltOutlined/>}
        >
          {saving ? "Saving ... ": mode === "add"? "Add": "Update" }
           
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: 2, m: 1 }}
          onClick={() => {
            setOpen(false);
            setPrice("");
      setDsic("");
      (setproductCategorie(""), setProductName(""), setImage(""));
          }}
        >
          Cancle
        </Button>
      </Box>
    </Box>
  );
}
