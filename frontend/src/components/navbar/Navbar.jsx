import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";

export default function Navbar({
    q,
    setQ,
    cartCount = 0,
    brand = { name: "ShopEase", href: "/" },
}) {
    const topNav = useMemo(
        () => [
            "Home",
            "Accessories",
            "Laptops",
            "Wearables",
            "Audio",
            "Cameras",
            "Phones",
            "Deals",
        ],
        []
    );

    const getNavHref = (item) => {
        if (item === "Home") return "/";
        if (item === "Deals") return "/products";
        return `/products?category=${encodeURIComponent(item)}`;
    };

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between py-3">
                    <Link to={brand.href} className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white font-bold">
                            {brand.name?.[0] || "S"}
                        </div>
                        <div className="text-lg font-extrabold tracking-tight">
                            {brand.name?.slice(0, 4) || "Shop"}
                            <span className="text-emerald-600">{brand.name?.slice(4) || "Ease"}</span>
                        </div>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden md:flex w-[520px] max-w-[52vw] items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
                        <FiSearch className="text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search for phones, laptops, and more..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="hidden sm:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Sign In
                        </Link>

                        <button className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50 ring-1 ring-slate-200">
                            <FiUser className="text-slate-500" />
                        </button>

                        <Link
                            to="/cart"
                            className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50 ring-1 ring-slate-200"
                            aria-label="View cart"
                        >
                            <FiShoppingCart className="text-slate-500" />
                            {cartCount > 0 && (
                                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Top Navigation */}
                <nav className="flex items-center gap-6 overflow-x-auto pb-3 text-sm text-slate-600">
                    {topNav.map((item) => (
                        <Link
                            key={item}
                            to={getNavHref(item)}
                            className={`whitespace-nowrap hover:text-slate-900 ${item === "Deals" ? "font-semibold text-rose-600" : ""
                                }`}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Search */}
                <div className="md:hidden pb-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
                        <FiSearch className="text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search products..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
