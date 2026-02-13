import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiBox, FiShoppingBag, FiTag } from "react-icons/fi";

const links = [
  { to: "/admin", label: "Dashboard", icon: FiHome, end: true },
  { to: "/admin/users", label: "Users", icon: FiUsers },
  { to: "/admin/products", label: "Products", icon: FiBox },
  { to: "/admin/categories", label: "Categories", icon: FiTag },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 min-h-screen">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="text-lg font-extrabold text-gray-900">
          Admin<span className="text-emerald-600">Panel</span>
        </div>
        <p className="mt-1 text-xs text-gray-400">Manage your store</p>
      </div>

      <nav className="px-4 py-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : "text-gray-700 hover:bg-gray-50",
                ].join(" ")
              }
            >
              <Icon className="text-base" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
