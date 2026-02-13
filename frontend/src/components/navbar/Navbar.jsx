import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";

export default function Navbar({ q, setQ, cartCount = 0, brand = { name: "ShopEase", href: "/" } }) {
    const [showSuggestions, setShowSuggestions] = useState(false);

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

    const suggestions = useMemo(
        () => [
            "Wireless headphones",
            "Gaming laptop",
            "Smartwatch",
            "Noise cancelling",
            "4K camera",
            "USB-C hub",
            "Mechanical keyboard",
            "Portable SSD",
        ],
        []
    );

    const filteredSuggestions = useMemo(() => {
        if (!q) return suggestions.slice(0, 5);
        const lowered = q.toLowerCase();
        return suggestions.filter((item) => item.toLowerCase().includes(lowered)).slice(0, 5);
    }, [q, suggestions]);

    const getNavHref = (item) => {
        if (item === "Home") return "/";
        if (item === "Deals") return "/products";
        return `/products?category=${encodeURIComponent(item)}`;
    };

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/90 backdrop-blur">
            <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between py-3 gap-4">
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
                    <div className="relative hidden md:flex w-[560px] max-w-[58vw]">
                        <div className="flex w-full items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-emerald-500">
                            <FiSearch className="text-slate-400" />
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                placeholder="Search products, brands, categories..."
                                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                                aria-label="Search"
                            />
                            <button
                                type="button"
                                className="h-9 rounded-xl bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500"
                            >
                                Search
                            </button>
                        </div>

                        {showSuggestions && filteredSuggestions.length > 0 ? (
                            <div className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                                    Suggestions
                                </div>
                                {filteredSuggestions.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onMouseDown={() => setQ(item)}
                                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    <span>{item}</span>
                                </button>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="hidden sm:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                            Sign In
                        </Link>

                        <button className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50 ring-1 ring-slate-200 focus-visible:ring-2 focus-visible:ring-emerald-500">
                            <FiUser className="text-slate-500" />
                        </button>

                        <Link
                            to="/cart"
                            className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50 ring-1 ring-slate-200 focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                            className={`whitespace-nowrap hover:text-slate-900 ${item === "Deals" ? "font-semibold text-emerald-700" : ""
                                }`}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                    {/* Mobile Search */}
                    <div className="md:hidden pb-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-emerald-500">
                        <FiSearch className="text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search products..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                        />
                        <button
                            type="button"
                            className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white"
                        >
                            Go
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
