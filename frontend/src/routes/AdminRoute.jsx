import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (role !== "ADMIN") {
        return <Navigate to="/products" replace />;
    }

    return children;
};

export default AdminRoute;
