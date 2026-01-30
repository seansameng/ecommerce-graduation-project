import { FiBell, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Topbar = ({ title }) => {
    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("user") || "null") || {
            fullName: "Admin",
        };

    const role = localStorage.getItem("role") || "ADMIN";

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4 flex items-center justify-between">
                {/* Left */}
                <div>
                    <p className="text-xs text-gray-400">Home / {title}</p>
                    <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    {/* Notification */}
                    <button className="relative p-2 rounded-xl border border-gray-200 hover:bg-gray-50">
                        <FiBell className="text-gray-600" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                    </button>

                    {/* User */}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl border border-gray-200">
                        <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                            {user.fullName.charAt(0)}
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900">
                                {user.fullName}
                            </p>
                            <p className="text-xs text-gray-500">{role}</p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition"
                    >
                        <FiLogOut />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
