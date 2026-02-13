import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiBox, FiUsers, FiShoppingBag, FiTag } from "react-icons/fi";
import { getProducts } from "../../api/adminProductApi";
import { getUsers } from "../../api/adminuserApi";
import { getOrders } from "../../api/orderApi";
import { getCategories } from "../../api/adminCategoryApi";

export default function AdminDashboard() {
    const [counts, setCounts] = useState({
        products: 0,
        users: 0,
        orders: 0,
        categories: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError("");

        Promise.all([getProducts(), getUsers(), getOrders(), getCategories()])
            .then(([productsRes, usersRes, ordersRes, categoriesRes]) => {
                if (!mounted) return;
                setCounts({
                    products: Array.isArray(productsRes?.data) ? productsRes.data.length : 0,
                    users: Array.isArray(usersRes?.data) ? usersRes.data.length : 0,
                    orders: Array.isArray(ordersRes?.data) ? ordersRes.data.length : 0,
                    categories: Array.isArray(categoriesRes?.data) ? categoriesRes.data.length : 0,
                });
            })
            .catch((err) => {
                if (!mounted) return;
                setError(err?.response?.data?.message || err?.message || "Failed to load dashboard stats.");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
                    Store Overview
                </p>
                <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    Admin Dashboard
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                    Quick snapshot of products, categories, users, and orders.
                </p>
            </div>

            {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-800">
                    {error}
                </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Products"
                    value={counts.products}
                    icon={FiBox}
                    loading={loading}
                    href="/admin/products"
                    cardBg="bg-blue-50/70"
                    iconBg="bg-blue-100 text-blue-700"
                />
                <StatCard
                    title="Categories"
                    value={counts.categories}
                    icon={FiTag}
                    loading={loading}
                    href="/admin/categories"
                    cardBg="bg-yellow-50/70"
                    iconBg="bg-yellow-100 text-yellow-700"
                />
                <StatCard
                    title="Users"
                    value={counts.users}
                    icon={FiUsers}
                    loading={loading}
                    href="/admin/users"
                    cardBg="bg-red-50/70"
                    iconBg="bg-red-100 text-red-700"
                />
                <StatCard
                    title="Orders"
                    value={counts.orders}
                    icon={FiShoppingBag}
                    loading={loading}
                    href="/admin/orders"
                    cardBg="bg-emerald-50/70"
                    iconBg="bg-emerald-100 text-emerald-700"
                />
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, loading, href, iconBg, cardBg }) {
    const content = (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {title}
                    </div>
                    <div className="mt-1 text-2xl font-extrabold text-slate-900">
                        {loading ? "..." : value}
                    </div>
                </div>
                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${iconBg || "bg-emerald-50 text-emerald-700"}`}>
                    <Icon />
                </div>
            </div>
            <div className="mt-4 h-1.5 w-full rounded-full bg-white/80 ring-1 ring-slate-100">
                <div className="h-full w-2/3 rounded-full bg-slate-200" />
            </div>
        </>
    );

    if (href) {
        return (
            <Link
                to={href}
                className={`block rounded-3xl border border-slate-100 ${cardBg || "bg-white"} p-5 shadow-sm hover:shadow-md transition`}
            >
                {content}
            </Link>
        );
    }

    return (
        <div className={`rounded-3xl border border-slate-100 ${cardBg || "bg-white"} p-5 shadow-sm`}>
            {content}
        </div>
    );
}
