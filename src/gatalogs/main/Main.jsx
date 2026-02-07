import { Box, Divider, Stack, Typography } from "@mui/material";
import Crd from "./Crd";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Main({gategory}) {
    // const [products,setProduct] = useState([]);
    // useEffect(()=>{
    //   getProducts().then((data)=>{
    //     setProduct(data);
    //     // console.log(data)
    //   });
    // },[]);
    
      const {resturantSlug} = useParams();
      const [product,setProduct] = useState([]);
      
      useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_API_URL}/products/${resturantSlug}`)
        .then((res)=>{
          // console.log(res)
          setProduct(res.data.menu);
          
          // console.log(res)
        
        }).catch(()=>{
          console.log("Restourant not found");
        })
      } ,[resturantSlug]);
      // console.log(product)
   
     
  return (
    <Stack direction={"column"}  id={gategory.name}>
   
      <Typography mt={5}>{gategory.name}</Typography>
      <Divider sx={{ my: 3 }} />
      <Stack  direction={"row"} gap={3} flexWrap={"wrap"} sx={{justifyContent:{xs:"center",sm:"center",md:"flex-start"}}}>
        {product.filter((item)=>item.gategoryID === gategory._id).map((item) => {
          return <Crd data={item} key={item._id} />;
        })}
      </Stack>
    </Stack>
  );
}
