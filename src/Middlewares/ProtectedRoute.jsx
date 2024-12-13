import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {tokenHandler} from "@/utils/tokenHandler.js";


const ProtectedRoute = ({ children }) => {
  const location = useLocation();



  return tokenHandler.has() ? (
      <>{children}</>
  ) : (
      <Navigate to="/login" state={{ from: location }} replace />
  );
};



export default ProtectedRoute;
