import {
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useEffect, useState } from "react";
import axios from "axios";
import Tables from "./Tables";
const statusConfig = {
  APPROVED: {
    label: "APPROVED",
    color: "success",
  },
  PENDING: {
    label: "PENDING",
    color: "warning",
  },
  REJECTED: { label: "REJECTED", color: "error" },
};
const tableRow = [
  {
    header: "Business Name",
    render: (row) => row.bussninsId?.name || "-",
  },

  {
    header: "Amount",
    render: (row) => row.subsId?.paidAmount || "-",
  },
  {
    header: "DATE",
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
  // {
  //   header: "Subscription",
  //   render: (row) => {
  //     const planName = row.planId?.name;
  //     const config = SubscriptionConfig[planName];

  //     return (
  //       <Chip
  //         label={config?.label || planName}
  //         size="small"
  //         sx={{
  //           whiteSpace: "nowrap",
  //           bgcolor: config?.bgcolor,
  //           color: config?.color,
  //         }}
  //       />
  //     );
  //   },
  // },
  {
    header: "Status",
    render: (row) => {
      // const status = row.busId?.isActive ? "active" : "disabled";
      const status = row.status;
      const config = statusConfig[status];

      return (
        <Chip
          label={config?.label || row.status}
          color={config?.color || "default"}
          size="small"
          sx={{ whiteSpace: "nowrap" }}
        />
      );
    },
  },
];

export default function PaymentManagment() {
  const [changeSelected, setchangeSelected] = useState(0);
  const [status, setStatus] = useState("all");
  const [paymants, setPayments] = useState([]);
  const [sum, setsum] = useState(0);
  const calculationOfpaymanets = () => {
    const Total = paymants.reduce((acc, item) => {
      return acc + (item.subsId?.paidAmount || 0);
    }, 0);
    setsum(Total);
  };
  const paymaentPending = paymants.filter((item) => item.status === "PENDING" && item.type === "RENEW");
  const getPayments = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) throw new Error("No token");
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/paymantes/allPaymants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPayments(res.data);
      console.log(paymants);
    } catch (error) {
      console.log(error);
    }
  };
  const handaleAccepted = async()=>{
    const token = localStorage.getItem("token");
    try {
      if (!token) throw new Error("No token");
      const res = await axios.put(
        import.meta.env.VITE_API_URL + "/paymantes/allPaymants",
        {   
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPayments(res.data);
      console.log(paymants);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPayments();
  }, []);

  useEffect(() => {
    calculationOfpaymanets();
  }, [paymants]);
  console.log(paymants);
  return (
    <Box>
      <Box>
        <Typography variant="h5">Payment Management</Typography>
        <Typography variant="body1">
          Verify payment proofs and view Payments
        </Typography>
      </Box>
      <Box
        sx={{
          m: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row", gap: 5 },
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            p: 3,
            width: { xs: "100%", md: "33%" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Total Revenue
            </Typography>
            <Typography variant="h4">${sum}</Typography>
          </Box>
          <AttachMoneyIcon
            sx={{
              fontSize: "40px",
              bgcolor: "#DBFCE7",
              p: 1,
              width: "60px",
              height: "60px",
              color: "#00A63E",
              borderRadius: "50%",
            }}
          />
        </Paper>
        {/* <Paper sx={{display:"flex",p:3,width:{xs:"100%",md:"33%"},justifyContent:"space-between",alignItems:"center"}}>
          <Box>
            <Typography variant="body2" sx={{opacity:0.7}}>Active Businesses</Typography>
            <Typography variant="h4">3</Typography>
          </Box>
          <BusinessIcon sx={{fontSize:"40px",bgcolor:"#DBEAFE",p:1,width:"60px",height:"60px",color:"#155DFC",borderRadius:"50%"}}/>
        </Paper> */}
        <Paper
          sx={{
            display: "flex",
            p: 3,
            width: { xs: "100%", md: "33%" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Pending Verifications
            </Typography>
            <Typography variant="h4">{paymaentPending.length}</Typography>
          </Box>
          <NewReleasesIcon
            sx={{
              fontSize: "40px",
              bgcolor: "#FFEDD4",
              p: 1,
              width: "60px",
              height: "60px",
              color: "#F54900",
              borderRadius: "50%",
            }}
          />
        </Paper>
      </Box>
      <Box>
        <Box
          sx={{
            bgcolor: "#ECECF0",
            p: 0.5,
            borderRadius: 5,
            display: "inline-flex",
            width: "fit-content",
            mb: 2,
            mt: 2,
            gap: 1,
          }}
        >
          <Button
            startIcon={<NewReleasesIcon />}
            disableRipple
            sx={{
              bgcolor: changeSelected === 0 ? "#fff" : null,
              color: "#000",
              borderRadius: 5,
              px: 2,
            }}
            onClick={() => {
              setchangeSelected(0);
            }}
          >
            Pending Payment
          </Button>
          <Button
            disableRipple
            startIcon={<AttachMoneyIcon />}
            sx={{
              bgcolor: changeSelected === 1 ? "#fff" : null,
              color: "#000",
              borderRadius: 5,
              px: 2,
            }}
            onClick={() => {
              setchangeSelected(1);
            }}
          >
            Payment History
          </Button>
        </Box>
        <Box
          sx={{
            display: changeSelected === 0 ? "flex" : "none",
            flexDirection: "column",
            borderRadius: 3,
            border: "1px solid #FEDAB1",
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 1,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#FFF7ED",
              borderRadius: "10px 10px 0 0",
              borderBottom: "1px solid #FEDAB1",
              mb: 2,
            }}
          >
            <Typography variant="h5">Pending Payment Verifications</Typography>
            <Badge badgeContent={paymaentPending.length} color="warning"></Badge>
          </Box>
          {/* show abbrove or rejected the pending paymanets */}
          {paymaentPending.map((pay) => (
            <Box
              sx={{ display: "flex", flexDirection: "column", px: 3, mb: 1 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {pay.bussninsId?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  my: 1,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    bgcolor: "#F3E8FF",
                    p: 0.8,
                    color: "#7659CF",
                    fontWeight: "bold",
                    borderRadius: 1.5,
                  }}
                >
                  {pay.subsId?.planId?.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {pay.subsId?.paidAmount}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Submitted: {new Date(pay.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box
                  component="img"
                  src={`${import.meta.env.VITE_API_URL}/uploads/${pay.receiptImage}`}
                  sx={{
                    height: "200px",
                    bgcolor: "black",
                    borderRadius: 3,
                    flexGrow: 1,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                ></Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "row",
                      md: "column",
                      justifyContent: { xs: "space-between" },
                    },
                  }}
                >
                  <Button
                    startIcon={<CheckIcon />}
                    sx={{
                      bgcolor: "#00A63E",
                      color: "#fff",
                      textTransform: "capitalize",
                      borderRadius: 2,
                      m: 1,
                      px: 2,
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    startIcon={<CloseIcon />}
                    sx={{
                      bgcolor: "#E7000B",
                      color: "#fff",
                      textTransform: "capitalize",
                      borderRadius: 2,
                      m: 1,
                      px: 2,
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: changeSelected === 1 ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 2,
              borderRadius: 3,
              mb: 2,
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              placeholder="Search businesses or owner"
              sx={{
                "& .MuiInputBase-root": {
                  height: 45,
                  borderRadius: 2,
                },
              }}
            />
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                input={
                  <OutlinedInput
                    startAdornment={
                      <Box
                        sx={{ mr: 1, display: "flex", alignItems: "center" }}
                      >
                        <FilterListIcon fontSize="small" />
                      </Box>
                    }
                  />
                }
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">PENDING</MenuItem>
                <MenuItem value="pending">APPROVED</MenuItem>
                <MenuItem value="overdue">REJECTED</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          <Tables data={paymants} tableRow={tableRow} />
        </Box>
      </Box>
    </Box>
  );
}
