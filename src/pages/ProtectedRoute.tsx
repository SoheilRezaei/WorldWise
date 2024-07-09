import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function ProtectedRoute({children} : {children: React.ReactNode}) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;