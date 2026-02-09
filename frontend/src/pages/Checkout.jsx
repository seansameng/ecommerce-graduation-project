import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import useCart from "../hooks/useCart";

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

export default function Checkout() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { items, cartCount, subtotal, clearCart } = useCart();

  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal > 0 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    if (items.length === 0) return;
    clearCart();
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-[#f7f4ee] text-slate-900"
      style={{ fontFamily: '"Space Grotesk", "DM Sans", "Segoe UI", sans-serif' }}
    >
      <Navbar q={q} setQ={setQ} cartCount={cartCount} brand={{ name: "ShopEase", href: "/" }} />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
            <p className="mt-1 text-sm text-slate-500">
              Complete your order in a few steps.
            </p>
          </div>
          <Link
            to="/cart"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Back to Cart
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 ring-1 ring-slate-100">
            <div className="text-lg font-extrabold">Your cart is empty</div>
            <p className="mt-2 text-sm text-slate-500">
              Add items before checking out.
            </p>
            <Link
              to="/products"
              className="mt-5 inline-flex rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <form
              onSubmit={handlePlaceOrder}
              className="rounded-3xl bg-white p-6 ring-1 ring-slate-100"
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold">Contact</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      placeholder="First name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      required
                      placeholder="Last name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:col-span-2"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-extrabold">Shipping</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      placeholder="Address"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:col-span-2"
                    />
                    <input
                      required
                      placeholder="City"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      required
                      placeholder="State"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      required
                      placeholder="Postal code"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      required
                      placeholder="Phone"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-extrabold">Payment</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      placeholder="Cardholder name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:col-span-2"
                    />
                    <input
                      required
                      placeholder="Card number"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:col-span-2"
                    />
                    <input
                      required
                      placeholder="MM / YY"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      required
                      placeholder="CVC"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-emerald-600"
              >
                Place Order
              </button>
            </form>

            <div className="h-fit rounded-3xl bg-white p-6 ring-1 ring-slate-100">
              <div className="text-lg font-extrabold">Order Summary</div>
              <div className="mt-4 space-y-4">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3">
                    <img
                      src={it.imageUrl}
                      alt={it.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-bold">{it.name}</div>
                      <div className="text-xs text-slate-500">
                        Qty {it.qty}
                      </div>
                    </div>
                    <div className="text-sm font-bold">{money(it.price * it.qty)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold">{money(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-bold">{money(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax</span>
                  <span className="font-bold">{money(tax)}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between">
                  <span className="text-slate-900 font-extrabold">Total</span>
                  <span className="text-emerald-600 font-extrabold">{money(total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
