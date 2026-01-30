import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = ({ title, children }) => {
    const navigate = useNavigate();
    const pageTitle = title || "Admin";

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <div className="flex-1 min-w-0">
                {/* Topbar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Home / {pageTitle}</p>
                        <h1 className="text-2xl font-extrabold text-gray-900">{pageTitle}</h1>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="h-10 px-4 rounded-xl bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition"
                    >
                        Logout
                    </button>
                </header>

                {/* Page content */}
                <main className="p-6">{children ? children : <Outlet />}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
