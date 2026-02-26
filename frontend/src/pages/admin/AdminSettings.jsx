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
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">Store Controls</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-600">Configure store preferences and support defaults.</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-slate-700">Store details</h2>
              <p className="mt-1 text-xs text-slate-500">Brand-facing settings for customers.</p>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Store name</label>
                  <input
                    name="storeName"
                    value={form.storeName}
                    onChange={onChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Currency</label>
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={onChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="KHR">KHR</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-sm font-semibold text-slate-700">Support contacts</h2>
              <p className="mt-1 text-xs text-slate-500">Shown on invoices and customer support pages.</p>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Support email</label>
                  <input
                    name="supportEmail"
                    type="email"
                    value={form.supportEmail}
                    onChange={onChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Support phone</label>
                  <input
                    name="supportPhone"
                    value={form.supportPhone}
                    onChange={onChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-sm font-semibold text-slate-700">Inventory</h2>
              <p className="mt-1 text-xs text-slate-500">Set when to flag low stock items.</p>
              <div className="mt-4 max-w-sm">
                <label className="text-sm font-semibold text-slate-700">Low stock threshold</label>
                <input
                  name="lowStockThreshold"
                  type="number"
                  min="1"
                  value={form.lowStockThreshold}
                  onChange={onChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save settings"}
            </button>
            <span className="text-xs text-slate-500">Settings save locally for this admin device.</span>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700">Status</h2>
          <p className="mt-2 text-sm text-slate-600">
            Changes apply to storefront defaults and help customers reach your team faster.
          </p>
          {status.message ? (
            <div
              className={[
                "mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold",
                status.type === "success"
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-red-100 bg-red-50 text-red-700",
              ].join(" ")}
            >
              {status.message}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500">
              No recent updates. Save to apply new values.
            </div>
          )}
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Reminder</p>
            <p className="mt-2 text-sm text-emerald-700">
              Keep support contacts current to reduce order delays.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
