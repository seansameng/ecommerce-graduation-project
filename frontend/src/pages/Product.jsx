import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Filter, Search, ShoppingCart } from "lucide-react";
import { getProducts } from "../api/productApi";
import useCart from "../hooks/useCart";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop";

const Product = () => {
    const location = useLocation();
    const { addToCart, cartCount } = useCart();
    const [q, setQ] = useState("");
    const categoryFromUrl = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const value = params.get("category");
        return value ? value.trim() : "";
    }, [location.search]);

    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "all");
    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        setSelectedCategory(categoryFromUrl || "all");
    }, [categoryFromUrl]);

    useEffect(() => {
        let ignore = false;
        const params = {};
        if (query) params.q = query;
        if (selectedCategory && selectedCategory !== "all") params.category = selectedCategory;

        setStatus("loading");
        setError("");

        getProducts(params)
            .then((res) => {
                if (ignore) return;
                setProducts(Array.isArray(res.data) ? res.data : []);
                setStatus("success");
            })
            .catch((err) => {
                if (ignore) return;
                setStatus("error");
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load products."
                );
            });

        return () => {
            ignore = true;
        };
    }, [query, selectedCategory]);

    const categories = useMemo(() => {
        const set = new Set(products.map((p) => p.category).filter(Boolean));
        const list = ["all", ...Array.from(set)];
        if (selectedCategory && !list.includes(selectedCategory)) {
            list.push(selectedCategory);
        }
        return list;
    }, [products, selectedCategory]);

    const onSearchSubmit = (event) => {
        event.preventDefault();
        setQuery(searchInput.trim());
    };

    return (
        <div
            className="min-h-screen bg-[#f7f4ee] text-slate-900"
            style={{ fontFamily: '"Space Grotesk", "DM Sans", "Segoe UI", sans-serif' }}
        >
            <Navbar q={q} setQ={setQ} cartCount={cartCount} brand={{ name: "ShopEase", href: "/" }} />

            <section className="border-b border-slate-200/60 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="text-xs uppercase tracking-[0.4em] text-emerald-600 font-semibold mb-3">
                                Curated tech
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
                                Product Collection
                            </h1>
                            <p className="text-slate-600 max-w-2xl">
                                Browse the latest arrivals and best sellers. Filter by category or search by name.
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-4 sticky top-0 z-20">
                <div className="bg-white/90 backdrop-blur rounded-3xl border border-slate-200/70 shadow-sm p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <form onSubmit={onSearchSubmit} className="flex w-full lg:max-w-xl gap-3">
                            <div className="relative flex-1">
                                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input
                                    value={searchInput}
                                    onChange={(event) => setSearchInput(event.target.value)}
                                    placeholder="Search products by name"
                                    className="w-full border border-slate-200 rounded-xl px-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                            >
                                Search
                            </button>
                        </form>

                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Filter className="w-4 h-4" />
                            <span>{products.length} items</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                        {categories.map((cat) => {
                            const active = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${active
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        }`}
                                >
                                    {cat === "all" ? "All" : cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
                {status === "loading" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden animate-pulse"
                            >
                                <div className="aspect-square bg-slate-100" />
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-slate-100 rounded w-2/3" />
                                    <div className="h-5 bg-slate-100 rounded w-3/4" />
                                    <div className="h-6 bg-slate-100 rounded w-1/3" />
                                    <div className="h-10 bg-slate-100 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {status === "error" && (
                    <div className="bg-red-50 text-red-700 border border-red-100 rounded-2xl p-6">
                        {error}
                    </div>
                )}

                {status === "success" && products.length === 0 && (
                    <div className="bg-white border border-slate-200/70 rounded-2xl p-10 text-center text-slate-600">
                        No products found. Try adjusting your search or category filter.
                    </div>
                )}

                {status === "success" && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => {
                            const price = Number(product.price) || 0;
                            const inStock = Number(product.stock) > 0;
                            return (
                                <div
                                    key={product.id}
                                    className="group bg-white rounded-3xl border border-slate-200/70 hover:border-emerald-200 hover:shadow-2xl transition-all overflow-hidden"
                                >
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="relative block aspect-[4/3] bg-slate-50 overflow-hidden"
                                    >
                                        <img
                                            src={product.imageUrl || FALLBACK_IMAGE}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {!inStock && (
                                            <span className="absolute top-4 left-4 bg-slate-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                Out of Stock
                                            </span>
                                        )}
                                    </Link>

                                    <div className="p-5">
                                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            <span>{product.category || "Uncategorized"}</span>
                                            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600">
                                                {inStock ? `${product.stock} in stock` : "Notify me"}
                                            </span>
                                        </div>
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="mt-2 block font-extrabold text-slate-900 text-lg leading-snug hover:text-emerald-700"
                                        >
                                            {product.name}
                                        </Link>
                                        <p className="text-sm text-slate-600 mt-2 min-h-[2.5rem]">
                                            {product.description || "No description available."}
                                        </p>

                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                                ${price.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="mt-5 grid grid-cols-2 gap-3">
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold ring-1 ring-slate-200 hover:bg-slate-50"
                                            >
                                                View
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addToCart({
                                                        id: product.id,
                                                        name: product.name,
                                                        price: product.price,
                                                        imageUrl: product.imageUrl || FALLBACK_IMAGE,
                                                    })
                                                }
                                                disabled={!inStock}
                                                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${inStock
                                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow hover:shadow-lg"
                                                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                                                    }`}
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default Product;
