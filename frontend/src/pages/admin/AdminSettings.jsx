import { useState } from "react";

export default function AdminSettings() {
  const [form, setForm] = useState({
    storeName: "ShopEase",
    supportEmail: "support@shopease.com",
    supportPhone: "+855 12 345 678",
    currency: "USD",
    lowStockThreshold: 5,
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Configure store preferences.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
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
          <button
            type="button"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
}
