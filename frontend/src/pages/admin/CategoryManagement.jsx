import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiTag } from "react-icons/fi";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategoryById,
} from "../../api/adminCategoryApi";

const emptyCategory = {
    id: null,
    name: "",
};

export default function CategoryManagement() {
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [form, setForm] = useState(emptyCategory);
    const [saving, setSaving] = useState(false);
    const [formErr, setFormErr] = useState("");

    const fetchCategories = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getCategories();
            setItems(res.data || []);
        } catch (e) {
            setError(e?.response?.data?.message || "Failed to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const filtered = useMemo(() => {
        const keyword = q.trim().toLowerCase();
        return items
            .filter((c) => {
                const name = (c.name || "").toLowerCase();
                return !keyword || name.includes(keyword);
            })
            .sort((a, b) => (b.id || 0) - (a.id || 0));
    }, [items, q]);

    const openCreate = () => {
        setMode("create");
        setForm(emptyCategory);
        setFormErr("");
        setOpen(true);
    };

    const openEdit = (category) => {
        setMode("edit");
        setFormErr("");
        setForm({ id: category.id, name: category.name || "" });
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setFormErr("");
        setSaving(false);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (formErr) setFormErr("");
    };

    const validate = () => {
        if (!form.name.trim()) return "Category name is required";
        return "";
    };

    const handleSave = async () => {
        const msg = validate();
        if (msg) {
            setFormErr(msg);
            return;
        }

        setSaving(true);
        setFormErr("");

        try {
            const payload = { name: form.name.trim() };

            if (mode === "create") {
                const res = await createCategory(payload);
                if (res?.data) setItems((prev) => [res.data, ...prev]);
                else await fetchCategories();
            } else {
                const res = await updateCategory(form.id, payload);
                if (res?.data) {
                    setItems((prev) => prev.map((x) => (x.id === form.id ? res.data : x)));
                } else {
                    setItems((prev) => prev.map((x) => (x.id === form.id ? { ...x, ...payload } : x)));
                }
            }

            closeModal();
        } catch (e) {
            setFormErr(e?.response?.data?.message || "Save failed. Check backend validation.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const ok = window.confirm("Delete this category?");
        if (!ok) return;

        const prev = items;
        setItems((p) => p.filter((x) => x.id !== id));

        try {
            await deleteCategoryById(id);
        } catch (e) {
            setItems(prev);
            alert(e?.response?.data?.message || "Delete failed");
        }
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h2 className="text-lg font-extrabold text-gray-900">Categories</h2>
                    <p className="text-sm text-gray-500">Create and manage product categories.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiSearch />
                        </span>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search categories..."
                            className="w-full sm:w-72 rounded-xl border border-gray-200 bg-white px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200 transition"
                        />
                    </div>

                    <button
                        onClick={openCreate}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition"
                    >
                        <FiPlus /> New Category
                    </button>

                    <button
                        onClick={fetchCategories}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {loading && (
                <div className="mt-6 rounded-2xl bg-white border border-gray-200 p-5 text-gray-600">
                    Loading categories...
                </div>
            )}

            {error && (
                <div className="mt-6 rounded-2xl bg-red-50 border border-red-200 p-5 text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="mt-5 rounded-2xl bg-white border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-5 py-3 font-bold text-gray-700">Category</th>
                                        <th className="text-left px-5 py-3 font-bold text-gray-700">Created</th>
                                        <th className="text-right px-5 py-3 font-bold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((c) => (
                                        <tr key={c.id} className="border-b border-gray-100 last:border-0">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                                        <FiTag />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{c.name}</p>
                                                        <p className="text-xs text-gray-500">ID: {c.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-gray-700">
                                                {String(c.createdAt || "").slice(0, 10) || "-"}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEdit(c)}
                                                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                                                    >
                                                        <FiEdit2 /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(c.id)}
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
                                            <td colSpan={3} className="px-5 py-10 text-center text-gray-500">
                                                No categories found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {open && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full max-w-xl rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Category</p>
                                    <h3 className="text-lg font-extrabold text-gray-900">
                                        {mode === "create" ? "Add New Category" : "Edit Category"}
                                    </h3>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
                                >
                                    Close
                                </button>
                            </div>

                            <div className="p-6">
                                {formErr && (
                                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {formErr}
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm font-bold text-gray-700">Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={onChange}
                                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                        placeholder="Category name"
                                    />
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                                <button
                                    onClick={closeModal}
                                    className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={saving}
                                    onClick={handleSave}
                                    className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-60"
                                >
                                    {saving ? "Saving..." : mode === "create" ? "Create Category" : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
