import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { useState } from "react";

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function CartPage() {
    const navigate = useNavigate();
    const [q, setQ] = useState("");
    const { items, cartCount, subtotal, incQty, decQty, removeFromCart, clearCart } = useCart();

    const shipping = subtotal > 0 ? 5 : 0; // demo shipping
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
            <Navbar q={q} setQ={setQ} cartCount={cartCount} brand={{ name: "ShopEase", href: "/" }} />

            <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight">Your Cart</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            {cartCount === 0 ? "Cart is empty." : `${cartCount} item(s) in your cart.`}
                        </p>
                    </div>

                    {items.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="text-sm font-semibold text-rose-600 hover:text-rose-700"
                        >
                            Clear cart
                        </button>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="mt-8 rounded-3xl bg-white p-8 ring-1 ring-slate-100">
                        <div className="text-lg font-extrabold">Nothing here yet 🫠</div>
                        <p className="mt-2 text-sm text-slate-500">
                            Go add something nice — your future self will thank you.
                        </p>
                        <Link
                            to="/"
                            className="mt-5 inline-flex rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600"
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_0.7fr]">
                        {/* Items */}
                        <div className="space-y-4">
                            {items.map((it) => (
                                <div
                                    key={it.id}
                                    className="flex gap-4 rounded-3xl bg-white p-4 ring-1 ring-slate-100"
                                >
                                    <img
                                        src={it.imageUrl}
                                        alt={it.name}
                                        className="h-24 w-24 rounded-2xl object-cover"
                                    />

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="font-extrabold">{it.name}</div>
                                                <div className="mt-1 text-sm font-bold text-emerald-600">
                                                    {money(it.price)}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(it.id)}
                                                className="rounded-xl px-3 py-2 text-sm font-bold text-rose-600 ring-1 ring-rose-100 hover:bg-rose-50"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        {/* qty control */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => decQty(it.id)}
                                                    className="h-10 w-10 rounded-xl bg-slate-50 font-extrabold ring-1 ring-slate-200 hover:bg-slate-100"
                                                >
                                                    −
                                                </button>
                                                <div className="min-w-12 text-center text-sm font-extrabold">
                                                    {it.qty}
                                                </div>
                                                <button
                                                    onClick={() => incQty(it.id)}
                                                    className="h-10 w-10 rounded-xl bg-slate-50 font-extrabold ring-1 ring-slate-200 hover:bg-slate-100"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="text-sm font-extrabold">
                                                Line: <span className="text-slate-700">{money(it.price * it.qty)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="h-fit rounded-3xl bg-white p-5 ring-1 ring-slate-100">
                            <div className="text-lg font-extrabold">Order Summary</div>

                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="font-bold">{money(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Shipping</span>
                                    <span className="font-bold">{money(shipping)}</span>
                                </div>
                                <div className="border-t border-slate-100 pt-3 flex justify-between">
                                    <span className="text-slate-900 font-extrabold">Total</span>
                                    <span className="text-emerald-600 font-extrabold">{money(total)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="mt-5 w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-emerald-600"
                            >
                                Proceed to Checkout
                            </button>

                            <Link
                                to="/"
                                className="mt-3 block text-center text-sm font-semibold text-slate-500 hover:text-slate-700"
                            >
                                Continue shopping
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
