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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 text-slate-900">
      <Navbar q={q} setQ={setQ} cartCount={cartCount} brand={{ name: "ShopEase", href: "/" }} />

      <section className="relative mx-auto max-w-[1100px] px-4 py-10 md:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-10 right-6 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="relative flex flex-col gap-3 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">Account</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Settings</h1>
            <p className="mt-2 text-sm text-slate-600">
              Update your contact details and keep your profile accurate for faster checkout.
            </p>
          </div>
          <Link
            to="/account"
            className="inline-flex items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            Back to Account
          </Link>
        </div>

        {!hasToken ? (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-600">Please sign in to manage your settings.</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
              {status === "loading" && <div className="text-slate-500">Loading settings...</div>}
            {status === "error" && (
              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {status !== "loading" && (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Full name</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input
                    value={form.email}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500"
                    disabled
                  />
                  <p className="mt-2 text-xs text-slate-500">Email updates are managed by support.</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save settings"}
                  </button>
                  <span className="text-xs text-slate-500">Changes update your profile instantly.</span>
                </div>
              </form>
            )}
            </div>

            <aside className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-700">Profile checklist</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Keep your name consistent for smoother delivery.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Add a phone number for order updates.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Review your email access if you change providers.
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Tip</p>
                <p className="mt-2 text-sm text-emerald-700">
                  Use a number you can access while on deliveries for faster support.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <Footer categories={[]} />
    </div>
  );
}
