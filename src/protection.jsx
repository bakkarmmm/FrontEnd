import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role, onlyNoBusiness }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [hasBusiness, setHasBusiness] = useState(true);
  const [businessStatus, setBusinessStatus] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const checkBusiness = async () => {
      if (userRole === "bussnisOwner") {
        try {
          const res = await axios.get(import.meta.env.VITE_API_URL + "/dachboard/check", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setHasBusiness(res.data.hasBusiness);
          setBusinessStatus(res.data.status);
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
    };

    checkBusiness();
  }, []);
  if (loading) return null;

  if (!token) return <Navigate to="/" />;

  if (role && role !== userRole) return <Navigate to="/" />;
  if (
    userRole === "bussnisOwner" &&
    businessStatus === "PENDING" &&
    location.pathname !== "/pending"
  ) {
    return <Navigate to="/pending" replace />;
  }
  if (
    userRole === "bussnisOwner" &&
    businessStatus === "REJECTED" &&
    location.pathname !== "/rejected"
  ) {
    return <Navigate to="/rejected" replace />;
  }
  if (onlyNoBusiness && hasBusiness) {
    return <Navigate to="/dachboard" replace />;
  }

  if (!onlyNoBusiness && userRole === "bussnisOwner" && !hasBusiness) {
    return <Navigate to="/createbusiness" />;
  }
  return children;
};

export default ProtectedRoute;
