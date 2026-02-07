import { Box, Paper, Stack, Typography } from "@mui/material";
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
export default function DachCard({pers,Icon,number,label}){
    return(
        <Paper sx={{width:{xs:"100%",md:"24%"},borderRadius:3,p:3,display:"flex",flexDirection:"column",gap:3}}>
      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
         {Icon}
         <Box sx={{display:"flex",color:pers > 0 ?"#00A63E":"#E7000B"}}>
            {pers > 0 ? <TrendingUpOutlinedIcon/> :<TrendingDownOutlinedIcon/>}
          
          <Typography>{pers}%</Typography>
         </Box>
         
      </Box>
      <Box>
      <Typography variant="h5">{number}</Typography>
      <Typography sx={{opacity:0.7}}>{label}</Typography>
      </Box>
    </Paper>
    )
}