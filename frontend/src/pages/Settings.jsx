import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { getMyProfile, updateMyProfile } from "../api/userApi";
import useCart from "../hooks/useCart";

export default function Settings() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });

  const hasToken = useMemo(() => Boolean(localStorage.getItem("authToken")), []);

  useEffect(() => {
    if (!hasToken) return;
    let ignore = false;
    setStatus("loading");
    setError("");

    getMyProfile()
      .then((res) => {
        if (ignore) return;
        const data = res?.data || {};
        setForm({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
        });
        setStatus("success");
      })
      .catch((err) => {
        if (ignore) return;
        setStatus("error");
        setError(err?.message || "Failed to load settings.");
      });

    return () => {
      ignore = true;
    };
  }, [hasToken]);

  const onSubmit = (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    updateMyProfile({ fullName: form.fullName, phone: form.phone })
      .then((res) => {
        const data = res?.data || {};
        setForm((prev) => ({
          ...prev,
          fullName: data.fullName || prev.fullName,
          phone: data.phone || prev.phone,
        }));
        setSaving(false);
      })
      .catch((err) => {
        setSaving(false);
        setError(err?.message || "Failed to update settings.");
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar q={q} setQ={setQ} cartCount={cartCount} brand={{ name: "ShopEase", href: "/" }} />

      <section className="max-w-[960px] mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">Settings</h1>
          <Link to="/account" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            Back to Account
          </Link>
        </div>

        {!hasToken ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-slate-600">Please sign in to manage your settings.</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            {status === "loading" && <div className="text-slate-500">Loading settings...</div>}
            {status === "error" && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {status !== "loading" && (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Full name</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input
                    value={form.email}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                    disabled
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save settings"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </section>

      <Footer categories={[]} />
    </div>
  );
}
