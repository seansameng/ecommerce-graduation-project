import { useMemo, useState } from "react";
import { FiSearch, FiShield, FiUser, FiTrash2, FiLock, FiUnlock } from "react-icons/fi";

const MOCK = [
    { id: 1, fullName: "Admin User", email: "admin@techstore.com", phone: "012345678", role: "ADMIN", status: "ACTIVE", createdAt: "2026-01-10" },
    { id: 2, fullName: "Sok Dara", email: "dara@gmail.com", phone: "098765432", role: "USER", status: "ACTIVE", createdAt: "2026-01-12" },
    { id: 3, fullName: "Chan Sreypov", email: "pov@gmail.com", phone: "011223344", role: "USER", status: "BLOCKED", createdAt: "2026-01-13" },
    { id: 4, fullName: "Vendor One", email: "vendor@shop.com", phone: "010202020", role: "VENDOR", status: "ACTIVE", createdAt: "2026-01-15" },
];

const roles = ["ADMIN", "VENDOR", "USER"];

const badge = (type) => {
    if (type === "ACTIVE") return "bg-emerald-50 text-emerald-700";
    if (type === "BLOCKED") return "bg-red-50 text-red-700";
    return "bg-gray-100 text-gray-700";
};

const roleBadge = (role) => {
    if (role === "ADMIN") return "bg-emerald-50 text-emerald-700";
    if (role === "VENDOR") return "bg-amber-50 text-amber-700";
    return "bg-gray-100 text-gray-700";
};

const AdminUsers = () => {
    const [items, setItems] = useState(MOCK);

    // filters
    const [q, setQ] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sort, setSort] = useState("newest"); // newest | name | role

    const filtered = useMemo(() => {
        const keyword = q.trim().toLowerCase();

        let list = items.filter((u) => {
            const matchQ =
                !keyword ||
                u.fullName.toLowerCase().includes(keyword) ||
                u.email.toLowerCase().includes(keyword) ||
                (u.phone || "").toLowerCase().includes(keyword);

            const matchRole = roleFilter === "All" || u.role === roleFilter;
            const matchStatus = statusFilter === "All" || u.status === statusFilter;

            return matchQ && matchRole && matchStatus;
        });

        if (sort === "newest") list.sort((a, b) => b.id - a.id);
        if (sort === "name") list.sort((a, b) => a.fullName.localeCompare(b.fullName));
        if (sort === "role") list.sort((a, b) => a.role.localeCompare(b.role));

        return list;
    }, [items, q, roleFilter, statusFilter, sort]);

    const changeRole = (id, newRole) => {
        // In real API: PUT /api/admin/users/{id}/role
        setItems((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    };

    const toggleBlock = (id) => {
        // In real API: PUT /api/admin/users/{id}/status
        setItems((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, status: u.status === "BLOCKED" ? "ACTIVE" : "BLOCKED" } : u
            )
        );
    };

    const removeUser = (id) => {
        const ok = window.confirm("Delete this user?");
        if (!ok) return;
        // In real API: DELETE /api/admin/users/{id}
        setItems((prev) => prev.filter((u) => u.id !== id));
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h2 className="text-lg font-extrabold text-gray-900">Users</h2>
                    <p className="text-sm text-gray-500">Manage roles, access, and user status.</p>
                </div>

                <div className="relative w-full sm:w-96">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiSearch />
                    </span>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search name, email, phone..."
                        className="w-full rounded-xl border border-gray-200 bg-white px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200 transition"
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                >
                    <option value="All">All Roles</option>
                    {roles.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                >
                    <option value="All">All Status</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="BLOCKED">BLOCKED</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                >
                    <option value="newest">Sort: Newest</option>
                    <option value="name">Sort: Name A→Z</option>
                    <option value="role">Sort: Role A→Z</option>
                </select>

                <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 flex items-center">
                    <span className="font-semibold">{filtered.length}</span>
                    <span className="ml-2 text-gray-500">users</span>
                </div>
            </div>

            {/* Table */}
            <div className="mt-6 rounded-2xl bg-white border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-5 py-3 font-bold text-gray-700">User</th>
                                <th className="text-left px-5 py-3 font-bold text-gray-700">Phone</th>
                                <th className="text-left px-5 py-3 font-bold text-gray-700">Role</th>
                                <th className="text-left px-5 py-3 font-bold text-gray-700">Status</th>
                                <th className="text-left px-5 py-3 font-bold text-gray-700">Created</th>
                                <th className="text-right px-5 py-3 font-bold text-gray-700">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((u) => (
                                <tr key={u.id} className="border-b border-gray-100 last:border-0">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`h-10 w-10 rounded-xl flex items-center justify-center ${u.role === "ADMIN" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                                                    }`}
                                            >
                                                {u.role === "ADMIN" ? <FiShield /> : <FiUser />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{u.fullName}</p>
                                                <p className="text-xs text-gray-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-gray-700">{u.phone || "-"}</td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${roleBadge(u.role)}`}>
                                                {u.role}
                                            </span>

                                            {/* Change role dropdown */}
                                            <select
                                                value={u.role}
                                                onChange={(e) => changeRole(u.id, e.target.value)}
                                                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-200"
                                            >
                                                {roles.map((r) => (
                                                    <option key={r} value={r}>
                                                        {r}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge(u.status)}`}>
                                            {u.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-gray-700">{u.createdAt}</td>

                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => toggleBlock(u.id)}
                                                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold border transition ${u.status === "BLOCKED"
                                                        ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                                        : "border-amber-200 text-amber-700 hover:bg-amber-50"
                                                    }`}
                                            >
                                                {u.status === "BLOCKED" ? <FiUnlock /> : <FiLock />}
                                                {u.status === "BLOCKED" ? "Unblock" : "Block"}
                                            </button>

                                            <button
                                                onClick={() => removeUser(u.id)}
                                                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50 transition"
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Notes */}
            <div className="mt-6 rounded-2xl bg-white border border-gray-200 p-5">
                <p className="text-sm font-bold text-gray-900">Admin Notes</p>
                <p className="mt-1 text-sm text-gray-500">
                    In backend, implement endpoints like:
                    <span className="ml-2 font-semibold text-gray-700">
                        GET users • PUT role • PUT status • DELETE user
                    </span>
                </p>
            </div>
        </>
    );
};

export default AdminUsers;
