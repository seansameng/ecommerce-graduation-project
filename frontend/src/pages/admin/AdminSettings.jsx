import { useEffect, useState } from "react";

const STORAGE_KEY = "admin_settings_v1";

export default function AdminSettings() {
  const [form, setForm] = useState({
    storeName: "ShopEase",
    supportEmail: "support@shopease.com",
    supportPhone: "+855 12 345 678",
    currency: "USD",
    lowStockThreshold: 5,
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore storage failures
    }
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.message) setStatus({ type: "", message: "" });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: "", message: "" });
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          storeName: form.storeName,
          supportEmail: form.supportEmail,
          supportPhone: form.supportPhone,
          currency: form.currency,
          lowStockThreshold: Number(form.lowStockThreshold || 1),
        })
      );
      setStatus({ type: "success", message: "Settings saved." });
    } catch {
      setStatus({ type: "error", message: "Failed to save settings." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Configure store preferences.</p>
      </div>

      <form onSubmit={onSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-gray-700">Store name</label>
            <input
              name="storeName"
              value={form.storeName}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Currency</label>
            <select
              name="currency"
              value={form.currency}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="KHR">KHR</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Support email</label>
            <input
              name="supportEmail"
              type="email"
              value={form.supportEmail}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Support phone</label>
            <input
              name="supportPhone"
              value={form.supportPhone}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Low stock threshold</label>
            <input
              name="lowStockThreshold"
              type="number"
              min="1"
              value={form.lowStockThreshold}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {status.message ? (
            <div
              className={[
                "mr-auto rounded-lg border px-3 py-2 text-sm",
                status.type === "success"
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-red-100 bg-red-50 text-red-700",
              ].join(" ")}
            >
              {status.message}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
