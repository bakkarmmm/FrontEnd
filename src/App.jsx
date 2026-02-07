import { Box } from "@mui/material"
import LoginPage from "./Componets/dachboard/LoginPage"
import Gatalog from "./gatalogs/Gatalog"
import { CartProvider } from "./gatalogs/CartContext"
import Dachboard from "./Componets/dachboard/Dachboard"
import { Outlet } from "react-router-dom"

function App() {

  

  return (
    <CartProvider>
    <Box >
    <Outlet/>
    </Box>
    </CartProvider>
  )
}

export default App
