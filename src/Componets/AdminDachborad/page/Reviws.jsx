import { Box, Button, Dialog, Divider, Typography } from "@mui/material";
import { useState } from "react";

export default function Reviws({ status, data,handelAcceptsOrRejected }) {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        p: 2,
        borderRadius: 5,
        gap: 2,
        mb: 1,
      }}
    >
      <Typography variant="h5">{status}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "48%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Business Information</Typography>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Business Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {data.busId?.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Owner Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {data.busId?.bussnisOwner?.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Phone
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {data.busId?.contact}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Business Type
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {data.busId?.type?.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Submitted Date
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {data.busId?.createdAt?.slice(0, 10)}
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            display: { xs: "block", md: "none" },
            my: { xs: 2, md: "none" },
          }}
        />
        <Box
          sx={{
            width: { xs: "100%", md: "48%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Payment Information</Typography>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Payment Amount
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              $ {data.planId?.price}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Payment method
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Wich Money
            </Typography>
          </Box>
          {data.payment && (
            <Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Payment Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {data.payment?.createdAt?.slice(0, 10)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Payment Document
                </Typography>

                <Box
                  component="img"
                  src={`${import.meta.env.VITE_API_URL}/uploads/${data.payment?.receiptImage}`}
                  alt="Payment Prof"
                  sx={{
                    width: "80%",
                    mt: 0.5,
                    height: 200,
                    objectFit: "cover",
                    cursor: "pointer",
                    borderRadius: 2,
                  }}
                  onClick={() => setOpen(true)}
                />
              </Box>
              <Typography sx={{fontSize:"12px"}}>Click image to view full size</Typography>
            </Box>
          )}
          {!data.payment && (
            <Box sx={{ bgcolor: "#FEF2F2", p: 2, borderRadius: 4 }}>
              <Typography
                variant="body2"
                sx={{ textAlign: "center", color: "#9F0712" }}
              >
                Not have a paymant ...
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Divider />
      <Typography variant="h6">Review Decision</Typography>
      {data.busId?.status === "PENDING" ? (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mr: 2,
              borderRadius: 3,
              bgcolor: "#00A63E",
              boxShadow: "none",
            }}
            onClick={()=>{
                handelAcceptsOrRejected(data.busId?._id,"ACTIVE")
            }}
          >
            Accept
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{
              mr: 2,
              borderRadius: 3,
              bgcolor: "#D4183D",
              boxShadow: "none",
            }}
            onClick={()=>{handelAcceptsOrRejected(data.busId?._id,"REJECTED")}}
          >
            Rejected
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: data.busId?.status === "ACTIVE" ? "#F0FDF4" : "#FEF2F2",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: data.busId?.status === "ACTIVE" ? "#106630" : "#9F0712",
            }}
          >
            {data.busId?.status === "ACTIVE"
              ? "This order has been accepted."
              : "This order has been rejected."}
          </Typography>
        </Box>
      )}

      {/* show fullSize image */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        PaperProps={{
          sx: { background: "transparent", boxShadow: "none" },
        }}
      >
        <Box
          component="img"
          src={`${import.meta.env.VITE_API_URL}/uploads/${data.payment?.receiptImage}`}
          alt="Full Image"
          sx={{
            width: "90vw",
            height: "auto",
            maxHeight: "90vh",
            borderRadius: 2,
          }}
        ></Box>
      </Dialog>
    </Box>
  );
}
