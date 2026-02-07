import { Box, Stack, Typography } from "@mui/material";
import DachCard from "./DachCard";
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
const CardInfo = [

]
export default function SubDachboard() {
  return (
  <Box>
    <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5">Dashboard Overview</Typography>
          <Typography variant="body2">
          Welcome back, here's what's happening with your platform
          </Typography>
        </Box>
        
      </Box>
     <Stack direction={{xs:"column",md:"row"}} gap={2}>
<DachCard pers={12} number={247} label={"Total Businesses"} Icon={<AddBusinessOutlinedIcon fontSize="large"  sx={{color:"#155DFC",bgcolor:"#EFF6FF",borderRadius:3,textAlign:"center",width:"50px",height:"50px",p:1}}/>}/>
<DachCard pers={8} number={231} label={"Active Businesses"} Icon={<TaskAltOutlinedIcon fontSize="large"  sx={{color:"#0DAB48",bgcolor:"#F0FDF4",borderRadius:3,textAlign:"center",width:"50px",height:"50px",p:1}}/>}/>
<DachCard pers={-3} number={231} label={"Disabled Businesses"} Icon={<CancelOutlinedIcon fontSize="large"  sx={{color:"#E7000B",bgcolor:"#FEF2F2",borderRadius:3,textAlign:"center",width:"50px",height:"50px",p:1}}/>}/>
<DachCard pers={15} number={231} label={"Disabled Businesses"} Icon={<PeopleOutlineOutlinedIcon fontSize="large"  sx={{color:"#9810FA",bgcolor:"#FAF5FF",borderRadius:3,textAlign:"center",width:"50px",height:"50px",p:1}}/>}/>
   </Stack>
  </Box>
  );
}
