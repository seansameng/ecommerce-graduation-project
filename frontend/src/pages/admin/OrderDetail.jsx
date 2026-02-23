import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../../api/orderApi";

const fmtDate = (v) => {
    if (!v) return "";
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

const statusStyles = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    PROCESSING: "bg-sky-50 text-sky-700 border-sky-200",
    SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
    NEW: "bg-slate-100 text-slate-700 border-slate-200",
};

export default function OrderDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [order, setOrder] = useState(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            setError("");
            try {
                const res = await getOrderById(id);
                if (!mounted) return;
                setOrder(res?.data || null);
            } catch (err) {
                if (!mounted) return;
                const msg =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load order.";
                setError(msg);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [id]);

    const itemCount = useMemo(() => {
        if (!Array.isArray(order?.items)) return 0;
        return order.items.reduce((sum, it) => sum + (Number(it?.quantity) || 0), 0);
    }, [order]);

    const statusKey = String(order?.status || "NEW").toUpperCase();

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                        Orders / Details
                    </p>
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        {order?.orderCode ? `Order ${order.orderCode}` : `Order #${id}`}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Review customer info, shipment details, and line items.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/admin/orders"
                        className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Back to orders
                    </Link>
                    <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${
                            statusStyles[statusKey] || statusStyles.NEW
                        }`}
                    >
                        {order?.status || "NEW"}
                    </span>
                </div>
            </div>

            {error && (
                <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="mt-6 space-y-3">
                    <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
                    <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-100" />
                    <div className="h-4 w-3/5 animate-pulse rounded-full bg-slate-100" />
                </div>
            ) : !order ? (
                <div className="mt-6 text-sm text-slate-600">Order not found.</div>
            ) : (
                <>
                    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Customer
                            </p>
                            <p className="mt-2 text-lg font-extrabold text-slate-900">
                                {order.customerName || "Unknown"}
                            </p>
                            <p className="text-sm text-slate-600">{order.customerEmail || "-"}</p>
                            <p className="text-sm text-slate-600">{order.customerPhone || "-"}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Shipping
                            </p>
                            <p className="mt-2 text-sm text-slate-700">
                                {order.shippingAddress || "No address provided."}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                Order Summary
                            </p>
                            <div className="mt-2 space-y-1 text-sm text-slate-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-slate-900">
                                        {fmtMoney(order.subtotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total</span>
                                    <span className="font-semibold text-slate-900">
                                        {fmtMoney(order.total)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Items</span>
                                    <span className="font-semibold text-slate-900">
                                        {itemCount}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Created</span>
                                    <span className="text-slate-600">
                                        {fmtDate(order.createdAt) || "-"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Updated</span>
                                    <span className="text-slate-600">
                                        {fmtDate(order.updatedAt) || "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 overflow-auto rounded-2xl ring-1 ring-slate-100">
                        <table className="min-w-[900px] w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-700">
                                <tr>
                                    <th className="px-4 py-3 font-extrabold">Product</th>
                                    <th className="px-4 py-3 font-extrabold">Qty</th>
                                    <th className="px-4 py-3 font-extrabold">Unit Price</th>
                                    <th className="px-4 py-3 font-extrabold">Line Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {Array.isArray(order.items) && order.items.length > 0 ? (
                                    order.items.map((it, idx) => (
                                        <tr key={`${it.productId || "item"}-${idx}`}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {it.productImageUrl ? (
                                                        <img
                                                            src={it.productImageUrl}
                                                            alt={it.productName || "Product"}
                                                            className="h-12 w-12 rounded-xl border border-slate-200 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded-xl border border-dashed border-slate-200 bg-slate-50" />
                                                    )}
                                                    <div>
                                                        <div className="font-semibold text-slate-900">
                                                            {it.productName || "Unnamed product"}
                                                        </div>
                                                        <div className="text-xs text-slate-500">
                                                            ID: {it.productId ?? "-"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-slate-700">
                                                {it.quantity ?? "-"}
                                            </td>
                                            <td className="px-4 py-3 text-slate-700">
                                                {fmtMoney(it.unitPrice)}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-slate-900">
                                                {fmtMoney(it.lineTotal)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-4 py-5 text-slate-600" colSpan={4}>
                                            No items found for this order.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
