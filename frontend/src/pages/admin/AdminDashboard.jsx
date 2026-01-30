import React from "react";

export default function AdminDashboard() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">
                Welcome to the admin area. Use the sidebar to manage products, orders, and users.
            </p>
        </div>
    );
}
