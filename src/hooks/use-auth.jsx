import {Navigate, useLocation} from "react-router-dom";
import {tokenHandler} from "@/lib/tokenHandler.js";

const UseAuth = ({children}) => {
    const location = useLocation();

    if (tokenHandler.has() && location.pathname === "/login") {
        return <Navigate to="/" state={{ from: location }} replace />;
    }


    if (tokenHandler.has()) {
        return <>{children}</>;
    }


    return <Navigate to="/login" state={{ from: location }} replace />;
};


export default UseAuth;
