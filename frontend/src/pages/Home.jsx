import { Link } from "react-router-dom";
import {
    Truck,
    Shield,
    Headphones,
    RotateCcw,
    Star,
    TrendingUp,
    Award,
    Zap,
    ChevronRight,
} from "lucide-react";

const Home = () => {
    // ✅ MVP: localStorage cart helper
    const addToCart = (item) => {
        const key = "cart";
        const raw = localStorage.getItem(key);
        const cart = raw ? JSON.parse(raw) : [];

        const existing = cart.find((x) => x.id === item.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...item, qty: 1 });
        }

        localStorage.setItem(key, JSON.stringify(cart));
        alert("Added to cart ✅");
    };

    // ✅ Featured deals (later: replace with API data)
    const deals = [
        {
            id: 1,
            category: "💻 Computers",
            title: "Ultrabook Pro Series X",
            rating: 4.9,
            reviews: 540,
            oldPrice: 1099,
            price: 934.15,
            badge: "SAVE 15%",
            image:
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
            theme: "teal",
        },
        {
            id: 2,
            category: "📷 Photography",
            title: "Instax Mini Bundle",
            rating: 4.7,
            reviews: 128,
            price: 120,
            image:
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
            theme: "purple",
        },
        {
            id: 3,
            category: "⌨️ Accessories",
            title: "RGB Mechanical Keyboard",
            rating: 4.8,
            reviews: 89,
            price: 120,
            image:
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
            theme: "teal",
        },
        {
            id: 4,
            category: "🏃 Fitness",
            title: "Sports Tech Bundle",
            rating: 4.5,
            reviews: 32,
            price: 89.99,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
            theme: "orange",
        },
    ];

    const renderStars = (value) => {
        const full = Math.floor(value);
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => {
                    const filled = i < full;
                    return (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                    );
                })}
            </div>
        );
    };

    const themeBtn = (theme) => {
        if (theme === "purple")
            return "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600";
        if (theme === "orange")
            return "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600";
        return "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600";
    };

    const themeBorder = (theme) => {
        if (theme === "purple") return "hover:border-purple-500";
        if (theme === "orange") return "hover:border-orange-500";
        return "hover:border-teal-500";
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* ==================== HERO SECTION ==================== */}
            <section className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 min-h-[520px] shadow-2xl">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                }}
                            />
                        </div>

                        {/* Background image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-20"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200')",
                            }}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                        {/* Content */}
                        <div className="relative z-10 px-8 md:px-16 py-16 md:py-24 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold rounded-full uppercase mb-6 shadow-lg">
                                <Zap className="w-4 h-4" />
                                <span>Tech Week Sale - Up to 50% Off</span>
                            </div>

                            <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                                Smart Tech
                                <br />
                                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                    For Your Life
                                </span>
                            </h1>

                            <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed">
                                Discover cutting-edge technology with the latest phones, accessories, and fast chargers.
                                Premium quality, unbeatable prices.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/products"
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-2xl hover:scale-105"
                                >
                                    <span>Shop Now</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="flex gap-3">
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl transition-all border-2 border-white/20"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center justify-center px-6 py-4 bg-white text-indigo-700 hover:bg-gray-100 font-bold rounded-xl transition-all"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Floating stats */}
                        <div className="absolute bottom-8 right-8 hidden lg:flex gap-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                                <div className="text-3xl font-bold text-white">50K+</div>
                                <div className="text-sm text-gray-300">Happy Customers</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                                <div className="text-3xl font-bold text-white">4.9★</div>
                                <div className="text-sm text-gray-300">Customer Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== FEATURES SECTION ==================== */}
            <section className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-teal-50 transition-all cursor-pointer">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                <Truck className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="font-bold text-base text-gray-900">Free Shipping</p>
                                <p className="text-sm text-gray-600">Orders over $50</p>
                            </div>
                        </div>

                        <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-purple-50 transition-all cursor-pointer">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                <Shield className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="font-bold text-base text-gray-900">2-Year Warranty</p>
                                <p className="text-sm text-gray-600">Extended protection</p>
                            </div>
                        </div>

                        <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-all cursor-pointer">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                <Headphones className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="font-bold text-base text-gray-900">24/7 Support</p>
                                <p className="text-sm text-gray-600">Expert assistance</p>
                            </div>
                        </div>

                        <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 transition-all cursor-pointer">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                <RotateCcw className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="font-bold text-base text-gray-900">Easy Returns</p>
                                <p className="text-sm text-gray-600">60-day guarantee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CATEGORIES SECTION ==================== */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shop by Category</h2>
                            <p className="text-gray-600">Explore our curated collections</p>
                        </div>
                        <Link
                            to="/products"
                            className="hidden md:inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-bold group"
                        >
                            <span>View All</span>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link
                            to="/products?category=phones"
                            className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                            <img
                                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop"
                                alt="Phones"
                                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="inline-flex items-center gap-2 text-white/80 text-sm mb-2">
                                    <Award className="w-4 h-4" />
                                    <span>Best Sellers</span>
                                </div>
                                <h3 className="text-white font-bold text-2xl mb-1">Phones</h3>
                                <p className="text-gray-300 text-sm">Latest flagship models</p>
                            </div>
                        </Link>

                        <Link
                            to="/products?category=headphones"
                            className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500" />
                            <img
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop"
                                alt="Headphones"
                                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="inline-flex items-center gap-2 text-white/80 text-sm mb-2">
                                    <Zap className="w-4 h-4" />
                                    <span>Premium Audio</span>
                                </div>
                                <h3 className="text-white font-bold text-2xl mb-1">Headphones</h3>
                                <p className="text-gray-300 text-sm">Active noise cancelling</p>
                            </div>
                        </Link>

                        <Link
                            to="/products?category=smartwatches"
                            className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-600" />
                            <img
                                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=600&fit=crop"
                                alt="Smartwatches"
                                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="inline-flex items-center gap-2 text-white/80 text-sm mb-2">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Trending Now</span>
                                </div>
                                <h3 className="text-white font-bold text-2xl mb-1">Smartwatches</h3>
                                <p className="text-gray-300 text-sm">Track your fitness</p>
                            </div>
                        </Link>

                        <Link
                            to="/products?category=accessories"
                            className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600" />
                            <img
                                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=600&fit=crop"
                                alt="Accessories"
                                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="inline-flex items-center gap-2 text-white/80 text-sm mb-2">
                                    <Star className="w-4 h-4" />
                                    <span>New Arrivals</span>
                                </div>
                                <h3 className="text-white font-bold text-2xl mb-1">Accessories</h3>
                                <p className="text-gray-300 text-sm">Essential tech gear</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ==================== FEATURED DEALS SECTION ==================== */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Deals</h2>
                            <p className="text-gray-600">Limited time offers you don't want to miss</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {deals.map((p) => (
                            <div
                                key={p.id}
                                className={`group bg-white rounded-2xl border-2 border-gray-100 ${themeBorder(
                                    p.theme
                                )} hover:shadow-2xl transition-all overflow-hidden`}
                            >
                                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                    {p.badge && (
                                        <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
                                            {p.badge}
                                        </span>
                                    )}
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            {p.category}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-gray-900 mb-3 text-lg leading-snug">{p.title}</h3>

                                    <div className="flex items-center gap-2 mb-4">
                                        {renderStars(p.rating)}
                                        <span className="text-sm text-gray-600">
                                            {p.rating.toFixed(1)} ({p.reviews})
                                        </span>
                                    </div>

                                    <div className="flex items-baseline gap-2 mb-4">
                                        {p.oldPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ${p.oldPrice.toFixed(2)}
                                            </span>
                                        )}
                                        <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                            ${p.price.toFixed(2)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() =>
                                            addToCart({ id: p.id, name: p.title, price: p.price, imageUrl: p.image })
                                        }
                                        className={`w-full ${themeBtn(
                                            p.theme
                                        )} text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg`}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CALL TO ACTION ==================== */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
                        <Award className="w-4 h-4" />
                        <span>Join 50,000+ Happy Customers</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Upgrade Your Tech?</h2>
                    <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        Experience premium quality with exclusive deals. Free shipping on orders over $50.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            <span>Start Shopping</span>
                            <ChevronRight className="w-5 h-5" />
                        </Link>

                        <Link
                            to="/deals"
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold rounded-xl transition-all border-2 border-white/30"
                        >
                            <TrendingUp className="w-5 h-5" />
                            <span>View All Deals</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
