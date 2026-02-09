import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/orderApi";

const fmtDate = (v) => {
    if (!v) return "";
    // Backend may serialize LocalDateTime as a string, or as an array depending on Jackson config.
    if (Array.isArray(v)) return v.join("-");
    return String(v);
};

export default function OrderManagement() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [orders, setOrders] = useState([]);

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

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900">Order Management</h1>
            <p className="mt-2 text-sm text-slate-600">
                Manage customer orders here.
            </p>

            {error && (
                <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                    {error}
                </div>
            )}

            <div className="mt-6 overflow-auto rounded-xl ring-1 ring-slate-100">
                <table className="min-w-[900px] w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                        <tr>
                            <th className="px-4 py-3 font-extrabold">ID</th>
                            <th className="px-4 py-3 font-extrabold">Customer</th>
                            <th className="px-4 py-3 font-extrabold">Email</th>
                            <th className="px-4 py-3 font-extrabold">Status</th>
                            <th className="px-4 py-3 font-extrabold">Total</th>
                            <th className="px-4 py-3 font-extrabold">Created</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {loading ? (
                            <tr>
                                <td className="px-4 py-4 text-slate-600" colSpan={6}>
                                    Loading...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td className="px-4 py-4 text-slate-600" colSpan={6}>
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((o) => (
                                <tr key={o.id} className="hover:bg-slate-50/60">
                                    <td className="px-4 py-3 font-bold text-slate-900">{o.id}</td>
                                    <td className="px-4 py-3 text-slate-900">{o.customerName}</td>
                                    <td className="px-4 py-3 text-slate-700">{o.customerEmail}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-700">
                                            {o.status || "NEW"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-bold text-slate-900">
                                        {o.total != null ? `$${Number(o.total).toFixed(2)}` : "-"}
                                    </td>
                                    <td className="px-4 py-3 text-slate-700">{fmtDate(o.createdAt)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
