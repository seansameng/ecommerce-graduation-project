import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "./Sidebar";

const AdminLayout = ({ title, children }) => {
    const navigate = useNavigate();
    const pageTitle = title || "Admin";
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="h-screen bg-gray-50 flex text-[15px] md:text-[16px] lg:text-[17px]">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                className={[
                    "z-50 h-screen",
                    sidebarOpen ? "fixed inset-y-0 left-0 md:static md:block" : "hidden",
                ].join(" ")}
            >
                <Sidebar
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
                    onCloseMobile={() => setSidebarOpen(false)}
                    onLogout={handleLogout}
                />
            </div>

            <div className="flex-1 min-w-0 h-screen overflow-y-auto">
                <div className="p-4 flex items-center justify-between md:hidden">
                    <button
                        onClick={() => setSidebarOpen((prev) => !prev)}
                        className="h-10 w-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
                        aria-label="Toggle sidebar"
                        title="Toggle sidebar"
                    >
                        {sidebarOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Page content */}
                <main className="p-6">{children ? children : <Outlet />}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
