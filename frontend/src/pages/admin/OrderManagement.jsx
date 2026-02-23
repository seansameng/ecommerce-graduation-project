import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../api/orderApi";
import { FiEye } from "react-icons/fi";

const fmtDate = (v) => {
    if (!v) return "";
    // Backend may serialize LocalDateTime as a string, or as an array depending on Jackson config.
    if (Array.isArray(v)) {
        const [y, m, d, hh = 0, mm = 0, ss = 0] = v;
        const dt = new Date(y, (m || 1) - 1, d || 1, hh, mm, ss);
        return Number.isNaN(dt.getTime()) ? v.join("-") : dt.toLocaleString();
    }
    const dt = new Date(v);
    return Number.isNaN(dt.getTime()) ? String(v) : dt.toLocaleString();
};

const fmtMoney = (v) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return "-";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(n);
};

export default function OrderManagement() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("ALL");

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            setError("");
            try {
                const res = await getOrders();
                if (!mounted) return;
                setOrders(Array.isArray(res?.data) ? res.data : []);
            } catch (err) {
                if (!mounted) return;
                const msg =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load orders.";
                setError(msg);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const stats = useMemo(() => {
        const base = {
            total: orders.length,
            pending: 0,
            processing: 0,
            shipped: 0,
            delivered: 0,
            cancelled: 0,
        };
        orders.forEach((o) => {
            const s = String(o?.status || "PENDING").toUpperCase();
            if (s === "PENDING") base.pending += 1;
            else if (s === "PROCESSING") base.processing += 1;
            else if (s === "SHIPPED") base.shipped += 1;
            else if (s === "DELIVERED") base.delivered += 1;
            else if (s === "CANCELLED") base.cancelled += 1;
        });
        return base;
    }, [orders]);

    const filteredOrders = useMemo(() => {
        const q = query.trim().toLowerCase();
        return orders.filter((o) => {
            const s = String(o?.status || "PENDING").toUpperCase();
            if (status !== "ALL" && s !== status) return false;
            if (!q) return true;
            const hay = [
                o?.customerName,
                o?.customerEmail,
                o?.orderCode,
                o?.customerPhone,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return hay.includes(q);
        });
    }, [orders, query, status]);

    const statusStyles = {
        PENDING: "bg-amber-50 text-amber-700 border-amber-200",
        PROCESSING: "bg-sky-50 text-sky-700 border-sky-200",
        SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200",
        DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
        CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
        NEW: "bg-slate-100 text-slate-700 border-slate-200",
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        Order Management
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Track fulfillment, update statuses, and keep customers in the loop.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                        <p className="text-slate-500">Total orders</p>
                        <p className="text-lg font-extrabold text-slate-900">{stats.total}</p>
                    </div>
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
                        <p className="text-amber-700">Pending</p>
                        <p className="text-lg font-extrabold text-amber-800">{stats.pending}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm">
                        <p className="text-emerald-700">Delivered</p>
                        <p className="text-lg font-extrabold text-emerald-800">{stats.delivered}</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                    {error}
                </div>
            )}

            <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-1 items-center gap-3">
                    <div className="relative w-full max-w-md">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by customer, email, phone, or order code"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="ALL">All statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
                <div className="text-xs text-slate-500">
                    Showing {filteredOrders.length} of {orders.length} orders
                </div>
            </div>

            <div className="mt-5 overflow-auto rounded-2xl ring-1 ring-slate-100">
                <table className="min-w-[1050px] w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                        <tr>
                            <th className="px-4 py-3 font-extrabold">ID</th>
                            <th className="px-4 py-3 font-extrabold">Order</th>
                            <th className="px-4 py-3 font-extrabold">Customer</th>
                            <th className="px-4 py-3 font-extrabold">Status</th>
                            <th className="px-4 py-3 font-extrabold">Total</th>
                            <th className="px-4 py-3 font-extrabold">Items</th>
                            <th className="px-4 py-3 font-extrabold">Created</th>
                            <th className="px-4 py-3 font-extrabold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {loading ? (
                            <tr>
                                <td className="px-4 py-6 text-slate-600" colSpan={8}>
                                    <div className="flex flex-col gap-2">
                                        <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-100" />
                                        <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-100" />
                                    </div>
                                </td>
                            </tr>
                        ) : filteredOrders.length === 0 ? (
                            <tr>
                                <td className="px-4 py-5 text-slate-600" colSpan={8}>
                                    {orders.length === 0
                                        ? "No orders found."
                                        : "No orders match your filters."}
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((o) => (
                                <tr key={o.id} className="hover:bg-slate-50/60">
                                    <td className="px-4 py-3 font-bold text-slate-900">{o.id}</td>
                                    <td className="px-4 py-3 text-slate-700">
                                        <div className="font-semibold text-slate-900">
                                            {o.orderCode || "—"}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {o.customerPhone || "No phone"}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-900">
                                        <div className="font-semibold">{o.customerName || "—"}</div>
                                        <div className="text-xs text-slate-500">
                                            {o.customerEmail || "—"}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-extrabold ${
                                                statusStyles[String(o?.status || "NEW").toUpperCase()] ||
                                                statusStyles.NEW
                                            }`}
                                        >
                                            {o.status || "NEW"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-bold text-slate-900">
                                        {fmtMoney(o.total)}
                                    </td>
                                    <td className="px-4 py-3 text-slate-700">
                                        {Array.isArray(o.items) ? o.items.length : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-slate-700">
                                        {fmtDate(o.createdAt)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Link
                                            to={`/admin/orders/${o.id}`}
                                            className="inline-flex items-center justify-center rounded-lg border border-slate-200 h-9 w-9 text-slate-700 hover:bg-slate-50"
                                            aria-label="View order"
                                            title="View"
                                        >
                                            <FiEye />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
