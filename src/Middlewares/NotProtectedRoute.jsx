import {Navigate, useLocation} from "react-router-dom";
import {tokenHandler} from "@/utils/tokenHandler.js";


const NotProtectedRoute = ({children}) => {
    const location = useLocation();
    return tokenHandler.has() && location.pathname === "/login" ? (
        <Navigate to="/" state={{from: location}} replace/>
    ) : (
        <>{children}</>
    );
};

export default NotProtectedRoute;
