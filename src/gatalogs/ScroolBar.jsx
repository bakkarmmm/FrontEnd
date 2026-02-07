import {
 
  Box,
  Button,
  Divider,
  Paper,
} from "@mui/material";

import { useState, useEffect } from "react";
export default function ScroolBar({ gategory }) {
  console.log(gategory)
  const [isActive, setisActive] = useState("");
  
  useEffect(() => {
    if (gategory && gategory.length > 0) {
      setisActive(gategory[0]._id);
    }
  }, [gategory]);
  return (
    <Box >
      
      <Paper
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "left",
          alignItems: "center",
          overflowX: "auto",
          px:{xs:2,md:10},
          
          
          boxShadow:"0px 2px 1px 0px rgba(180, 179, 179, 0.2)"
        }}
      >
        {gategory.map((item) => {
          return (
            <Button
              key={item.name}
              component="a"
              href={`#${item.name}`}
              variant="contained"
              
              onClick={() => {
                setisActive(item._id);
              }}
              sx={{
                minWidth: "100px",
                p: 1,
               
                color: "#000",
                backgroundColor:
                  isActive === item._id
                    ? "rgba(0,166,62,1)"
                    : "rgba(246,243,244,1)",
                transition: "background-color 0.3s ease",
                borderRadius: 10,
                boxShadow:'none',
                my: 1,
                mx: 0,
                 mb:2,
                 px:2,
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </Paper>
    </Box>
  );
}
