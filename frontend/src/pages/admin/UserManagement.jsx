import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiShield, FiUser, FiTrash2, FiLock, FiUnlock } from "react-icons/fi";
import {
    getUsers,
    updateUserRole,
    updateUserStatus,
    deleteUser,
} from "../../api/adminuserApi";

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

const UserManagement = () => {
    const [items, setItems] = useState([]);

    // UI state
    const [q, setQ] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sort, setSort] = useState("newest");

    // request state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getUsers();
            setItems(res.data || []);
        } catch (e) {
            setError(e?.response?.data?.message || "Failed to load users (check token/role/CORS).");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filtered = useMemo(() => {
        const keyword = q.trim().toLowerCase();

        let list = items.filter((u) => {
            const matchQ =
                !keyword ||
                (u.fullName || "").toLowerCase().includes(keyword) ||
                (u.email || "").toLowerCase().includes(keyword) ||
                (u.phone || u.phoneNumber || "").toLowerCase().includes(keyword);

            const matchRole = roleFilter === "All" || u.role === roleFilter;
            const matchStatus = statusFilter === "All" || u.status === statusFilter;

            return matchQ && matchRole && matchStatus;
        });

        if (sort === "newest") list.sort((a, b) => (b.id || 0) - (a.id || 0));
        if (sort === "name") list.sort((a, b) => (a.fullName || "").localeCompare(b.fullName || ""));
        if (sort === "role") list.sort((a, b) => (a.role || "").localeCompare(b.role || ""));

        return list;
    }, [items, q, roleFilter, statusFilter, sort]);

    const changeRole = async (id, newRole) => {
        // optimistic update
        const prev = items;
        setItems((p) => p.map((u) => (u.id === id ? { ...u, role: newRole } : u)));

        try {
            await updateUserRole(id, newRole);
        } catch (e) {
            setItems(prev); // rollback
            alert(e?.response?.data?.message || "Update role failed");
        }
    };

    const toggleBlock = async (id) => {
        const user = items.find((x) => x.id === id);
        if (!user) return;

        const nextStatus = user.status === "BLOCKED" ? "ACTIVE" : "BLOCKED";

        // optimistic
        const prev = items;
        setItems((p) => p.map((u) => (u.id === id ? { ...u, status: nextStatus } : u)));

        try {
            await updateUserStatus(id, nextStatus);
        } catch (e) {
            setItems(prev);
            alert(e?.response?.data?.message || "Update status failed");
        }
    };

    const removeUser = async (id) => {
        const ok = window.confirm("Delete this user?");
        if (!ok) return;

        // optimistic
        const prev = items;
        setItems((p) => p.filter((u) => u.id !== id));

        try {
            await deleteUser(id);
        } catch (e) {
            setItems(prev);
            alert(e?.response?.data?.message || "Delete failed");
        }
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h2 className="text-lg font-extrabold text-gray-900">Users</h2>
                    <p className="text-sm text-gray-500">Manage roles, access, and user status.</p>
                </div>

                <div className="flex gap-3 w-full lg:w-auto">
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

                    <button
                        onClick={fetchUsers}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Status blocks */}
            {loading && (
                <div className="mt-6 rounded-2xl bg-white border border-gray-200 p-5 text-gray-600">
                    Loading users...
                </div>
            )}

            {error && (
                <div className="mt-6 rounded-2xl bg-red-50 border border-red-200 p-5 text-red-700">
                    {error}
                    <div className="mt-3">
                        <button
                            onClick={fetchUsers}
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )}

            {!loading && !error && (
                <>
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
                                                        className={`h-10 w-10 rounded-xl flex items-center justify-center ${u.role === "ADMIN"
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-gray-100 text-gray-500"
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

                                            <td className="px-5 py-4 text-gray-700">{u.phone || u.phoneNumber || "-"}</td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${roleBadge(u.role)}`}>
                                                        {u.role}
                                                    </span>

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

                                            <td className="px-5 py-4 text-gray-700">
                                                {String(u.createdAt || "").slice(0, 10) || "-"}
                                            </td>

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
                </>
            )}
        </>
    );
};

export default UserManagement;
