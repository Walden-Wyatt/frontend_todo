import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const isTokenPresent = localStorage.getItem("accessToken");
    // console.log(isTokenPresent);
    return(
        <div>
            {isTokenPresent ? <Outlet /> : <Navigate to="/login" />}
        </div>
    )
}

export default ProtectedRoutes;