import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProductById,
} from "../../api/adminProductApi";
import { getCategories as getAdminCategories } from "../../api/adminCategoryApi";

const makeEmptyProduct = (defaultCategory = "") => ({
    id: null,
    name: "",
    sku: "",
    category: defaultCategory,
    price: "",
    stock: "",
    status: "ACTIVE", // ACTIVE | DRAFT
    imageUrl: "",
    description: "",
});

const badge = (type) => {
    if (type === "ACTIVE") return "bg-emerald-50 text-emerald-700";
    if (type === "DRAFT") return "bg-gray-100 text-gray-700";
    return "bg-gray-100 text-gray-700";
};

export default function AdminProducts() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    // list UI state
    const [q, setQ] = useState("");
    const [cat, setCat] = useState("All");
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("newest");

    // request state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // modal state
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("create"); // create | edit
    const [form, setForm] = useState(makeEmptyProduct());
    const [saving, setSaving] = useState(false);
    const [formErr, setFormErr] = useState("");

    const defaultCategory = categories[0] || "";

    const fetchProducts = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getProducts();
            setItems(res.data || []);
        } catch (e) {
            setError(e?.response?.data?.message || "Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await getAdminCategories();
            const names = (res.data || [])
                .map((c) => c?.name)
                .filter(Boolean);
            setCategories(names);
        } catch {
            setCategories([]);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const filtered = useMemo(() => {
        const keyword = q.trim().toLowerCase();

        let list = items.filter((p) => {
            const name = (p.name || p.productName || "").toLowerCase();
            const sku = (p.sku || "").toLowerCase();
            const category = p.category || "Accessories";
            const st = p.status || "ACTIVE";

            const matchQ = !keyword || name.includes(keyword) || sku.includes(keyword);
            const matchCat = cat === "All" || category === cat;
            const matchStatus = status === "All" || st === status;

            return matchQ && matchCat && matchStatus;
        });

        if (sort === "newest") list.sort((a, b) => (b.id || 0) - (a.id || 0));
        if (sort === "price_asc") list.sort((a, b) => (a.price || 0) - (b.price || 0));
        if (sort === "price_desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
        if (sort === "stock")
            list.sort(
                (a, b) =>
                    (b.stock || 0) - (a.stock || 0)
            );

        return list;
    }, [items, q, cat, status, sort]);

    const totalUnits = useMemo(() => {
        return filtered.reduce((sum, p) => sum + Number(p.stock || 0), 0);
    }, [filtered]);

    const openCreate = () => {
        setMode("create");
        setForm(makeEmptyProduct(defaultCategory));
        setFormErr("");
        setOpen(true);
    };

    const openEdit = (p) => {
        setMode("edit");
        setFormErr("");
        setForm({
            id: p.id,
            name: p.name || p.productName || "",
            sku: p.sku || "",
            category: p.category || defaultCategory,
            price: String(p.price ?? ""),
            stock: String(p.stock ?? ""),
            status: p.status || "ACTIVE",
            imageUrl: p.imageUrl || "",
            description: p.description || "",
        });
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
        if (!form.name.trim()) return "Product name is required";
        if (!form.sku.trim()) return "SKU is required";
        if (!form.category) return "Category is required";
        const price = Number(form.price);
        if (Number.isNaN(price) || price < 0) return "Price must be a valid number";
        const stock = Number(form.stock);
        if (Number.isNaN(stock) || stock < 0) return "Stock must be 0 or more";
        return "";
    };

    const toPayload = () => ({
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        status: form.status,
        imageUrl: form.imageUrl?.trim() || null,
        description: form.description?.trim() || null,
    });

    const handleSave = async () => {
        const msg = validate();
        if (msg) {
            setFormErr(msg);
            return;
        }

        setSaving(true);
        setFormErr("");

        try {
            const payload = toPayload();

            if (mode === "create") {
                const res = await createProduct(payload);
                if (res?.data) setItems((prev) => [res.data, ...prev]);
                else await fetchProducts();
            } else {
                const res = await updateProduct(form.id, payload);
                if (res?.data) {
                    setItems((prev) => prev.map((x) => (x.id === form.id ? res.data : x)));
                } else {
                    setItems((prev) =>
                        prev.map((x) => (x.id === form.id ? { ...x, ...payload } : x))
                    );
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
        const ok = window.confirm("Delete this product?");
        if (!ok) return;

        const prev = items;
        setItems((p) => p.filter((x) => x.id !== id));

        try {
            await deleteProductById(id);
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
                    <h2 className="text-lg font-extrabold text-gray-900">Products</h2>
                    <p className="text-sm text-gray-500">Create, edit, and manage inventory.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiSearch />
                        </span>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search name or SKU..."
                            className="w-full sm:w-72 rounded-xl border border-gray-200 bg-white px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200 transition"
                        />
                    </div>

                    <button
                        onClick={openCreate}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition"
                    >
                        <FiPlus /> New Product
                    </button>

                    <button
                        onClick={fetchProducts}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Loading/Error */}
            {loading && (
                <div className="mt-6 rounded-2xl bg-white border border-gray-200 p-5 text-gray-600">
                    Loading products...
                </div>
            )}

            {error && (
                <div className="mt-6 rounded-2xl bg-red-50 border border-red-200 p-5 text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    {/* Filters */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        <select
                            value={cat}
                            onChange={(e) => setCat(e.target.value)}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                        >
                            <option value="All">All Categories</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                        >
                            <option value="All">All Status</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="DRAFT">DRAFT</option>
                        </select>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                        >
                            <option value="newest">Sort: Newest</option>
                            <option value="price_asc">Price: Low → High</option>
                            <option value="price_desc">Price: High → Low</option>
                            <option value="stock">Stock: High → Low</option>
                        </select>

                        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 flex items-center">
                            <span className="font-semibold">{totalUnits}</span>
                            <span className="ml-2 text-gray-500">units</span>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="mt-6 rounded-2xl bg-white border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-5 py-3 font-bold text-gray-700">Product</th>
                                        <th className="text-left px-5 py-3 font-bold text-gray-700">SKU</th>
                                        <th className="text-left px-5 py-3 font-bold text-gray-700">Category</th>
                                        <th className="text-left px-5 py-3 font-bold text-gray-700">Price</th>
                                        <th className="text-left px-5 py-3 font-bold text-gray-700">Stock</th>
                                        <th className="text-left px-5 py-3 font-bold text-gray-700">Status</th>
                                        <th className="text-right px-5 py-3 font-bold text-gray-700">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filtered.map((p) => {
                                        const name = p.name || p.productName || "";
                                        const stock = p.stock ?? 0;

                                        return (
                                            <tr key={p.id} className="border-b border-gray-100 last:border-0">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                                                            <FiImage />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{name}</p>
                                                            <p className="text-xs text-gray-500">ID: {p.id}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4 text-gray-700">{p.sku}</td>
                                                <td className="px-5 py-4 text-gray-700">{p.category}</td>
                                                <td className="px-5 py-4 text-gray-700">
                                                    ${Number(p.price || 0).toFixed(2)}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold ${stock === 0
                                                                ? "bg-red-50 text-red-700"
                                                                : stock < 10
                                                                    ? "bg-amber-50 text-amber-700"
                                                                    : "bg-emerald-50 text-emerald-700"
                                                            }`}
                                                    >
                                                        {stock}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge(p.status)}`}>
                                                        {p.status}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => openEdit(p)}
                                                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                                                        >
                                                            <FiEdit2 /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(p.id)}
                                                            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50 transition"
                                                        >
                                                            <FiTrash2 /> Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-5 py-10 text-center text-gray-500">
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Product</p>
                                    <h3 className="text-lg font-extrabold text-gray-900">
                                        {mode === "create" ? "Add New Product" : "Edit Product"}
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

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="text-sm font-bold text-gray-700">Name</label>
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                            placeholder="Product name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-gray-700">SKU</label>
                                        <input
                                            name="sku"
                                            value={form.sku}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                            placeholder="KB-1001"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-gray-700">Category</label>
                                        <select
                                            name="category"
                                            value={form.category}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                        >
                                            {categories.length === 0 && (
                                                <option value="">No categories</option>
                                            )}
                                            {categories.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-gray-700">Price ($)</label>
                                        <input
                                            name="price"
                                            value={form.price}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                            placeholder="59.99"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-gray-700">Stock</label>
                                        <input
                                            name="stock"
                                            value={form.stock}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                            placeholder="14"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-gray-700">Status</label>
                                        <select
                                            name="status"
                                            value={form.status}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                        >
                                            <option value="ACTIVE">ACTIVE</option>
                                            <option value="DRAFT">DRAFT</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-gray-700">Image URL</label>
                                        <input
                                            name="imageUrl"
                                            value={form.imageUrl}
                                            onChange={onChange}
                                            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="text-sm font-bold text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            value={form.description}
                                            onChange={onChange}
                                            rows={4}
                                            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                            placeholder="Product details..."
                                        />
                                    </div>
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
                                    {saving ? "Saving..." : mode === "create" ? "Create Product" : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
