import { useMemo, useState } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiImage } from "react-icons/fi";

const MOCK = [
    { id: 1, name: "Mechanical Keyboard", sku: "KB-1001", category: "Accessories", price: 59.99, stock: 14, status: "ACTIVE" },
    { id: 2, name: "Laptop 14” i5/16GB", sku: "LP-2002", category: "Laptops", price: 699.0, stock: 6, status: "ACTIVE" },
    { id: 3, name: "Smartwatch Pro", sku: "SW-3003", category: "Wearables", price: 89.5, stock: 0, status: "DRAFT" },
];

const categories = ["All", "Accessories", "Laptops", "Wearables", "Audio", "Cameras"];

const emptyProduct = {
    id: null,
    name: "",
    sku: "",
    category: "Accessories",
    price: "",
    stock: "",
    status: "ACTIVE",
    imageUrl: "",
    description: "",
};

const AdminProducts = () => {
    const [items, setItems] = useState(MOCK);

    // UI state
    const [q, setQ] = useState("");
    const [cat, setCat] = useState("All");
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("newest"); // newest | price_asc | price_desc | stock

    // modal state
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("create"); // create | edit
    const [form, setForm] = useState(emptyProduct);
    const [err, setErr] = useState("");

    const filtered = useMemo(() => {
        const keyword = q.trim().toLowerCase();

        let list = items.filter((p) => {
            const matchQ =
                !keyword ||
                p.name.toLowerCase().includes(keyword) ||
                p.sku.toLowerCase().includes(keyword);

            const matchCat = cat === "All" || p.category === cat;
            const matchStatus = status === "All" || p.status === status;

            return matchQ && matchCat && matchStatus;
        });

        if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
        if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
        if (sort === "stock") list.sort((a, b) => b.stock - a.stock);

        // newest: keep current order (or sort by id desc)
        if (sort === "newest") list.sort((a, b) => b.id - a.id);

        return list;
    }, [items, q, cat, status, sort]);

    const openCreate = () => {
        setMode("create");
        setForm(emptyProduct);
        setErr("");
        setOpen(true);
    };

    const openEdit = (p) => {
        setMode("edit");
        setForm({
            ...p,
            price: String(p.price),
            stock: String(p.stock),
            imageUrl: p.imageUrl || "",
            description: p.description || "",
        });
        setErr("");
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setErr("");
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (err) setErr("");
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

    const handleSave = () => {
        const msg = validate();
        if (msg) {
            setErr(msg);
            return;
        }

        const payload = {
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
        };

        if (mode === "create") {
            const newId = items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;
            setItems((prev) => [{ ...payload, id: newId }, ...prev]);
        } else {
            setItems((prev) => prev.map((x) => (x.id === payload.id ? payload : x)));
        }

        closeModal();
    };

    const handleDelete = (id) => {
        const ok = window.confirm("Delete this product?");
        if (!ok) return;
        setItems((prev) => prev.filter((x) => x.id !== id));
    };

    return (
        <>
            {/* Header actions */}
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
                </div>
            </div>

            {/* Filters */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                >
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
                    <span className="font-semibold">{filtered.length}</span>
                    <span className="ml-2 text-gray-500">items</span>
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
                            {filtered.map((p) => (
                                <tr key={p.id} className="border-b border-gray-100 last:border-0">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                                                <FiImage />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{p.name}</p>
                                                <p className="text-xs text-gray-500">ID: {p.id}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-gray-700">{p.sku}</td>
                                    <td className="px-5 py-4 text-gray-700">{p.category}</td>
                                    <td className="px-5 py-4 text-gray-700">${p.price.toFixed(2)}</td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock === 0
                                                    ? "bg-red-50 text-red-700"
                                                    : p.stock < 10
                                                        ? "bg-amber-50 text-amber-700"
                                                        : "bg-emerald-50 text-emerald-700"
                                                }`}
                                        >
                                            {p.stock}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === "ACTIVE"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
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
                            ))}

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
                                {err && (
                                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {err}
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
                                            {categories.filter((c) => c !== "All").map((c) => (
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
                                    onClick={handleSave}
                                    className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition"
                                >
                                    {mode === "create" ? "Create Product" : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminProducts;
