import { NavLink, useNavigate } from "react-router-dom";
import {
    FiGrid,
    FiShoppingBag,
    FiBox,
    FiUsers,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";
import { logout } from "../api/authApi"; // <-- adjust if your logout is in services

const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition";

const Sidebar = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        logout(); // removes authToken + role
        navigate("/login");
    };

    return (
        <aside className="w-72 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
            {/* Brand */}
            <div className="px-6 py-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500" />
                <div>
                    <p className="font-extrabold text-gray-900 leading-5">TECH STORE</p>
                    <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
            </div>

            {/* Menu title */}
            <div className="px-6 pb-2">
                <p className="text-xs font-bold tracking-wider text-gray-400">MENU</p>
            </div>

            {/* Menu links */}
            <nav className="px-4 space-y-2">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `${navItem} ${isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >
                    <FiGrid className="text-lg" />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        `${navItem} ${isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >
                    <FiShoppingBag className="text-lg" />
                    Orders
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `${navItem} ${isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >
                    <FiBox className="text-lg" />
                    Products
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `${navItem} ${isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >
                    <FiUsers className="text-lg" />
                    User Management
                </NavLink>

                <NavLink
                    to="/admin/settings"
                    className={({ isActive }) =>
                        `${navItem} ${isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >
                    <FiSettings className="text-lg" />
                    Settings
                </NavLink>
            </nav>

            {/* Bottom: user + logout */}
            <div className="mt-auto p-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900">
                        {JSON.parse(localStorage.getItem("user") || "null")?.fullName || "Admin"}
                    </p>
                    <p className="text-xs text-gray-500">{localStorage.getItem("role") || "ADMIN"}</p>

                    <button
                        onClick={onLogout}
                        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition"
                    >
                        <FiLogOut />
                        Logout
                    </button>
                </div>

                <p className="mt-3 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} NexusAdmin
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;
