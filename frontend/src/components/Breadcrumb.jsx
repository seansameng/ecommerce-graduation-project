import { Link, useLocation } from "react-router-dom";

const DEFAULT_LABELS = {
    products: "All Products",
    product: "Product",
    cart: "Cart",
    checkout: "Checkout",
    orders: "Orders",
    account: "Account",
    settings: "Settings",
    login: "Login",
    register: "Register",
    admin: "Admin",
    users: "Users",
    categories: "Categories",
    productsAdmin: "Products",
    ordersAdmin: "Orders",
};

const toLabel = (segment) => {
    if (!segment) return "";
    if (/^\d+$/.test(segment)) return "Details";
    const known = DEFAULT_LABELS[segment];
    if (known) return known;
    return segment
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

const buildCrumbs = (pathname) => {
    const parts = pathname.split("/").filter(Boolean);
    const crumbs = [{ label: "Home", to: "/" }];
    let currentPath = "";
    parts.forEach((part) => {
        currentPath += `/${part}`;
        crumbs.push({
            label: toLabel(part),
            to: currentPath,
        });
    });
    return crumbs;
};

const Breadcrumb = ({ items }) => {
    const location = useLocation();
    const crumbs = items && items.length > 0 ? items : buildCrumbs(location.pathname);

    return (
        <nav className="text-xs text-slate-500" aria-label="Breadcrumb">
            {crumbs.map((item, idx) => {
                const isLast = idx === crumbs.length - 1;
                return (
                    <span key={`${item.label}-${idx}`}>
                        {item.to && !isLast ? (
                            <Link to={item.to} className="hover:text-slate-900">
                                {item.label}
                            </Link>
                        ) : (
                            <span className={isLast ? "text-slate-700" : ""}>{item.label}</span>
                        )}
                        {!isLast && <span className="mx-2 text-slate-300">/</span>}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
