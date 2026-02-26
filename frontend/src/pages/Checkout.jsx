import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import useCart from "../hooks/useCart";
import { createOrder } from "../api/orderApi";
import { createPayment } from "../api/paymentApi";
import { getUserIdFromToken } from "../utils/jwt";

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

const PAYMENT_METHODS = [
  { id: "CARD", label: "Credit / Debit Card" },
  { id: "WALLET", label: "PayPal / KHQR Wallet" },
  { id: "COD", label: "Cash on Delivery" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { items, cartCount, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CARD");

  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal > 0 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping + tax;

  const steps = useMemo(
    () => [
      { id: 1, label: "Cart" },
      { id: 2, label: "Checkout" },
      { id: 3, label: "Confirmation" },
    ],
    []
  );
  const activeStep = 2;

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (items.length === 0) return;

    setError("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login", { replace: true, state: { from: { pathname: "/checkout" } } });
      return;
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      setError("Could not read user id from your session. Please log in again.");
      return;
    }

    const fd = new FormData(event.currentTarget);
    const firstName = String(fd.get("firstName") || "").trim();
    const lastName = String(fd.get("lastName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const address = String(fd.get("address") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const state = String(fd.get("state") || "").trim();
    const postalCode = String(fd.get("postalCode") || "").trim();

    const shippingAddress = [address, city, state, postalCode].filter(Boolean).join(", ");

    const orderItems = items.map((it) => ({
      productId: Number(it.id),
      quantity: Number(it.qty || 1),
    }));

    if (orderItems.some((x) => !Number.isFinite(x.productId))) {
      setError("One or more cart items are missing a valid product id. Please remove them and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        userId,
        customerName: `${firstName} ${lastName}`.trim(),
        customerEmail: email,
        customerPhone: phone || null,
        shippingAddress,
        paymentMethod,
        items: orderItems,
      };

      const res = await createOrder(payload);
      const created = res?.data;

      clearCart();
      if (created?.id != null) {
        navigate(`/order-success/${created.id}`);
      } else {
        navigate("/orders");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to place order. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{ fontFamily: '"Ubuntu", "Segoe UI", sans-serif' }}
    >
      <Navbar q={q} setQ={setQ} cartCount={cartCount} brand={{ name: "ShopEase", href: "/" }} />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
            <p className="mt-1 text-sm text-slate-500">Complete your order in a few steps.</p>
          </div>
          <div className="flex items-center text-xs font-semibold text-slate-500">
            {steps.map((step, index) => {
              const isCompleted = step.id < activeStep;
              const isActive = step.id === activeStep;
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-7 w-7 rounded-full border flex items-center justify-center ${
                        isCompleted
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : isActive
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-slate-300 bg-white text-slate-700"
                      }`}
                    >
                      {isCompleted ? (
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 10.5l3 3 7-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className={isActive || isCompleted ? "text-emerald-700" : ""}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <span className="mx-4 h-px w-10 bg-slate-300" />
                  )}
                </div>
              );
            })}
          </div>
          <Link to="/cart" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            Back to Cart
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 ring-1 ring-slate-100">
            <div className="text-lg font-extrabold">Your cart is empty</div>
            <p className="mt-2 text-sm text-slate-500">Add items before checking out.</p>
            <Link
              to="/products"
              className="mt-5 inline-flex rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <form onSubmit={handlePlaceOrder} className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
              {error && (
                <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                  {error}
                </div>
              )}
              <div className="space-y-6">
                <section>
                  <h2 className="text-base font-extrabold">Contact Information</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-500">First name</label>
                      <input
                        required
                        name="firstName"
                        placeholder="John"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">Last name</label>
                      <input
                        required
                        name="lastName"
                        placeholder="Doe"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-500">Email address</label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-base font-extrabold">Shipping Address</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-500">Street address</label>
                      <input
                        required
                        name="address"
                        placeholder="123 Main Street"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">City</label>
                      <input
                        required
                        name="city"
                        placeholder="Phnom Penh"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">Province/State</label>
                      <input
                        required
                        name="state"
                        placeholder="Phnom Penh"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">Postal code</label>
                      <input
                        required
                        name="postalCode"
                        placeholder="12000"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">Phone number</label>
                      <input
                        required
                        name="phone"
                        placeholder="+855 12 345 678"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-base font-extrabold">Payment Method</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                          paymentMethod === method.id
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "CARD" && (
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
                  )}

                  {paymentMethod === "PAYPAL" && (
                    <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
                      You will be redirected to PayPal after placing your order.
                    </div>
                  )}

                  {paymentMethod === "ABA_KHQR" && (
                    <div className="mt-4 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-6 text-center">
                      <div className="text-sm font-semibold text-emerald-700">ABA Mobile / KHQR</div>
                      <div className="mt-3 inline-flex h-24 w-24 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-xs text-emerald-500">
                        QR Code
                      </div>
                      <div className="mt-3 text-xs text-slate-500">Scan with ABA Mobile or any KHQR app.</div>
                    </div>
                  )}
                </section>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white hover:bg-emerald-600 disabled:opacity-70"
              >
                {submitting ? "Placing Order..." : `Place Order - ${money(total)}`}
              </button>
              <p className="mt-3 text-xs text-slate-500">
                Your payment info is encrypted with 256-bit SSL.
              </p>
            </form>

            <div className="h-fit rounded-3xl bg-white p-6 ring-1 ring-slate-200">
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
                      <div className="text-xs text-slate-500">Qty {it.qty}</div>
                    </div>
                    <div className="text-sm font-bold">{money(it.price * it.qty)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold">{money(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-bold">{money(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax (5%)</span>
                  <span className="font-bold">{money(tax)}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between">
                  <span className="text-slate-900 font-extrabold">Total</span>
                  <span className="text-emerald-600 font-extrabold">{money(total)}</span>
                </div>
              </div>

              {null}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
