import {ReactNode, useEffect} from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "./AuthContext";
import toast from "react-hot-toast";


interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { currentUser, loading } = useAuth();
    useEffect(() => {
        if(!loading && !currentUser)toast.error("You have to log in to access this site", { id: "no-access" });
    },[currentUser, loading]);

    if(loading)return <div>Loading...</div>;
    if(!currentUser){
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;