import { Box, Divider, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
export default function BusninessesCard({business,onEdit,onDelete,setFormValues}){
    return(
        <Paper sx={{ width: {xs:"100%",md:"32%"}, p: 2 ,borderRadius:3,height:"200px"}}>
        <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
          <Typography>{business.name}</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <EditOutlinedIcon sx={{ color: "#155DFC" }} onClick={()=>{onEdit(business._id);
              setFormValues({TypeName:business.name,Layout:business.layout,Description:business.disc})
            }} />
            <DeleteIcon sx={{ color: "#E7000B" }} onClick={()=>onDelete(business._id)} />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{ opacity: 0.6, fontSize: "0.9em", maxWidth: "70%" }}
          >
           {business.disc}
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "0.9em", opacity: 0.6 }}>
              Active Businesses
            </Typography>
            <Typography sx={{ fontSize: "0.9em" }}>50</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "0.9em", opacity: 0.6 }}>
              Created
            </Typography>
            {/* render: (row) =>
        row.startDate
          ? new Date(row.startDate)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")
          : "-", */}
            <Typography sx={{ fontSize: "0.9em" }}>{business.createdAt ? new Date(business.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-"):"-"}</Typography>
          </Box>
        </Box>
      </Paper>
    )
}