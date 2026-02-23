import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiBox, FiShoppingBag, FiTag, FiMenu, FiLogOut, FiX } from "react-icons/fi";

const links = [
  { to: "/admin", label: "Dashboard", icon: FiHome, end: true },
  { to: "/admin/users", label: "Users", icon: FiUsers },
  { to: "/admin/products", label: "Products", icon: FiBox },
  { to: "/admin/categories", label: "Categories", icon: FiTag },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
];

export default function Sidebar({ collapsed, onToggleCollapse, onCloseMobile, onLogout }) {
  return (
    <aside
      className={[
        "shrink-0 bg-white border-r border-gray-200 h-full flex flex-col transition-[width] duration-200 overflow-y-auto",
        collapsed ? "w-20" : "w-64",
      ].join(" ")}
    >
      <div
        className={[
          "border-b border-gray-200 flex items-start gap-3",
          collapsed ? "px-4 py-5 justify-center" : "px-6 py-5",
        ].join(" ")}
      >
        <button
          onClick={onToggleCollapse}
          className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FiMenu />
        </button>

        <div className={collapsed ? "hidden" : ""}>
          <div className="text-lg font-extrabold text-gray-900">
            Admin<span className="text-emerald-600">Panel</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">Manage your store</p>
        </div>

        <button
          onClick={onCloseMobile}
          className="h-9 w-9 rounded-xl border border-gray-200 items-center justify-center text-gray-700 hover:bg-gray-50 transition md:hidden flex ml-auto"
          aria-label="Close sidebar"
          title="Close sidebar"
        >
          <FiX />
        </button>
      </div>

      <nav className={["space-y-1 flex-1", collapsed ? "px-2 py-4" : "px-4 py-4"].join(" ")}>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  "flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition",
                  collapsed ? "justify-center" : "gap-3",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : "text-gray-700 hover:bg-gray-50",
                ].join(" ")
              }
              title={collapsed ? link.label : undefined}
            >
              <Icon className="text-base" />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className={collapsed ? "px-2 pb-5" : "px-4 pb-5"}>
        <button
          onClick={onLogout}
          className={[
            "w-full inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50 transition",
            collapsed ? "" : "gap-2",
          ].join(" ")}
          title={collapsed ? "Logout" : undefined}
        >
          <FiLogOut />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
