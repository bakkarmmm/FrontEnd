import { StrictMode } from "react";

import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Gatalog from "./gatalogs/Gatalog.jsx";
import Dachboard from "./Componets/dachboard/Dachboard.jsx";
import ProtectedRoute from "./protection.jsx";
import General from "./Componets/dachboard/DachbordPage/General.jsx";
import MangeCat from "./Componets/dachboard/DachbordPage/MangeCat.jsx";
import MangeProduct from "./Componets/dachboard/DachbordPage/MangeProduct.jsx";
import SubDach from "./Componets/AdminDachborad/SubDach.jsx";
import SubDachboard from "./Componets/AdminDachborad/page/Dachboard.jsx";
import Bmangment from "./Componets/AdminDachborad/page/Bmangment.jsx";
import Bowner from "./Componets/AdminDachborad/page/Bowner.jsx";
import Btype from "./Componets/AdminDachborad/page/Btype.jsx";
import Smangment from "./Componets/AdminDachborad/page/Smangment.jsx";
import Ssettings from "./Componets/AdminDachborad/page/Ssettings.jsx";
import LoginPage from "./Componets/dachboard/LoginPage.jsx";
import RegisterPage from "./Componets/dachboard/Register.jsx";
import CreateBussnise from "./Componets/dachboard/CreateBussninse.jsx";
import Npending from "./Componets/dachboard/Npending.jsx";
import Rejected from "./Componets/dachboard/REJECTED.jsx";
import PaymentManagment from "./Componets/AdminDachborad/page/Paymangemnt.jsx";
import Subscription from "./Componets/dachboard/DachbordPage/Subscription.jsx";
import Profile from "./Componets/dachboard/DachbordPage/Profile.jsx";
const router = createBrowserRouter(
  // createRoutesFromElements(

  //   <Route path='/' element={<App/>}>
  //     <Route index element={<Gatalog/>}/>
  //     <Route path='dachboard' element={<Dachboard/>}/>

  //   </Route>
  // )
  [
    {
      path: "pending",
      element: (
        <ProtectedRoute role="bussnisOwner" >
          <Npending/>
        </ProtectedRoute>
      ),
    },
    {
      path: "rejected",
      element: (
        <ProtectedRoute role="bussnisOwner" >
          <Rejected/>
        </ProtectedRoute>
      ),
    },
    {
      path: "createbusiness",
      element: (
        <ProtectedRoute role="bussnisOwner" onlyNoBusiness>
          <CreateBussnise />
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <LoginPage /> },
        { path: "/:resturantSlug", element: <Gatalog /> },
        { path: "/register", element: <RegisterPage /> },
      ],
    },
    {
      path: "dachboard",
      element: (
        <ProtectedRoute role={"bussnisOwner"}>
          <Dachboard />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <General /> },
        { path: "general", element: <General /> },
        { path: "mangecategory", element: <MangeCat /> },
        { path: "mangeproduct", element: <MangeProduct /> },
        {path:"Subscription",element:<Subscription/>},
        {path:"profile",element:<Profile/>}
      ],
    },
    {
      path: "Admindachboard",
      element: (
        <ProtectedRoute role={"admin"}>
          {" "}
          <SubDach />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <SubDachboard /> },
        { path: "dashboard", element: <SubDachboard /> },
        { path: "businessesManagement", element: <Bmangment /> },
        { path: "businessOwners", element: <Bowner /> },
        { path: "subscriptionsManagement", element: <Smangment /> },
        { path: "businessTypes", element: <Btype /> },
        { path: "systemSettings", element: <Ssettings /> },
         { path: "paymantsManagment", element: <PaymentManagment /> },
      ],
    },
  ],
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
