import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { getMyOrders } from "../api/orderApi";
import useCart from "../hooks/useCart";

const formatMoney = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export default function Orders() {
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  const [q, setQ] = useState("");
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const hasToken = useMemo(() => Boolean(localStorage.getItem("authToken")), []);

  useEffect(() => {
    if (!hasToken) return;
    let ignore = false;
    setStatus("loading");
    setError("");

    getMyOrders()
      .then((res) => {
        if (ignore) return;
        const items = Array.isArray(res.data) ? res.data : [];
        setOrders(items);
        setStatus("success");
      })
      .catch((err) => {
        if (ignore) return;
        setStatus("error");
        setError(err?.message || "Failed to load orders.");
      });

    return () => {
      ignore = true;
    };
  }, [hasToken]);

  const summary = useMemo(() => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const latestOrder = orders[0]?.createdAt || null;
    return { totalOrders, totalSpent, latestOrder };
  }, [orders]);

  const getStatusStyle = (statusText) => {
    const status = String(statusText || "").toLowerCase();
    if (status.includes("deliver") || status.includes("complete")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }
    if (status.includes("cancel")) {
      return "bg-rose-50 text-rose-700 border-rose-100";
    }
    if (status.includes("ship")) {
      return "bg-sky-50 text-sky-700 border-sky-100";
    }
    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  const handleReorder = (order) => {
    (order.items || []).forEach((item) => {
      addToCart(
        {
          id: item.productId,
          name: item.productName,
          price: item.unitPrice ?? (item.lineTotal ?? 0) / Math.max(1, item.quantity || 1),
          imageUrl: item.productImageUrl,
        },
        item.quantity || 1
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar q={q} setQ={setQ} cartCount={cartCount} brand={{ name: "ShopEase", href: "/" }} />

      <section className="max-w-[960px] mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">Orders</h1>
          <Link to="/account" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            Back to Account
          </Link>
        </div>

        {!hasToken ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-slate-600">Please sign in to view your orders.</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {status === "loading" && <div className="text-slate-500">Loading orders...</div>}
            {status === "error" && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {status === "success" && orders.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs uppercase tracking-widest text-slate-400">Total Orders</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">{summary.totalOrders}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs uppercase tracking-widest text-slate-400">Total Spent</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">
                    {formatMoney(summary.totalSpent)}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs uppercase tracking-widest text-slate-400">Latest Order</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">
                    {formatDate(summary.latestOrder)}
                  </div>
                </div>
              </div>
            )}

            {status === "success" && orders.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
                You have no orders yet.
              </div>
            )}

            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Order #{order.id}</div>
                    <div className="text-xs text-slate-500">Placed on {formatDate(order.createdAt)}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {order.items?.length || 0} items · {order.shippingAddress || "No address"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        order.status || "Pending"
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>
                    <div className="text-sm font-semibold text-emerald-700">
                      {formatMoney(order.total)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId((prev) => (prev === order.id ? null : order.id))
                    }
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {expandedId === order.id ? "Hide details" : "View details"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReorder(order)}
                    className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    Reorder
                  </button>
                </div>

                {expandedId === order.id && (
                  <div className="mt-4 space-y-2">
                    {(order.items || []).map((item) => (
                      <div key={`${order.id}-${item.productId}`} className="flex items-center gap-3">
                        {item.productImageUrl ? (
                          <img
                            src={item.productImageUrl}
                            alt={item.productName}
                            className="h-12 w-12 rounded-lg object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-slate-100" />
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-900">{item.productName}</div>
                          <div className="text-xs text-slate-500">Qty {item.quantity}</div>
                        </div>
                        <div className="text-sm font-semibold text-slate-700">
                          {formatMoney(item.lineTotal)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer categories={[]} />
    </div>
  );
}
