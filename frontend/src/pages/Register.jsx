import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const Register = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState({});

    const [agree, setAgree] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
        if (serverError) setServerError("");
    };

    // Simple strength scoring (good enough for MVP)
    const passwordStrength = useMemo(() => {
        const p = formData.password || "";
        let score = 0;

        if (p.length >= 8) score += 1;
        if (/[A-Z]/.test(p)) score += 1;
        if (/[0-9]/.test(p)) score += 1;
        if (/[^A-Za-z0-9]/.test(p)) score += 1;

        // Map to label
        if (p.length === 0) return { label: "", level: 0 }; // hidden when empty
        if (score <= 1) return { label: "WEAK", level: 1 };
        if (score === 2) return { label: "MEDIUM", level: 2 };
        return { label: "STRONG", level: 3 };
    }, [formData.password]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        else if (formData.fullName.trim().length < 3)
            newErrors.fullName = "Full name must be at least 3 characters";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8) newErrors.password = "Min. 8 characters";

        if (!agree) newErrors.agree = "You must accept Terms & Privacy";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        if (!validateForm()) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                // Optional: toast/alert
                navigate("/login");
            } else {
                setServerError(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setServerError("Network error. Please check your connection and try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const strengthWidth =
        passwordStrength.level === 0
            ? "w-0"
            : passwordStrength.level === 1
                ? "w-1/3"
                : passwordStrength.level === 2
                    ? "w-2/3"
                    : "w-full";

    return (
        <div className="min-h-screen bg-white">
            {/* Top Nav */}
            <div className="w-full border-b bg-white">
                <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-6 bg-emerald-500 rounded-sm" />
                        <span className="font-bold text-gray-900">TechStore</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm text-gray-700">
                        <a className="hover:text-gray-900" href="#shop">Shop</a>
                        <a className="hover:text-gray-900" href="#deals">Deals</a>
                        <a className="hover:text-gray-900" href="#support">Support</a>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <span className="hidden sm:inline text-gray-500">Already a member?</span>
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Page */}
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                    {/* Left Image Panel */}
                    <div className="relative rounded-2xl overflow-hidden min-h-[520px]">
                        {/* Replace this with your real image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80')",
                            }}
                        />
                        <div className="absolute inset-0 bg-black/35" />

                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-7">
                                <h3 className="text-4xl font-extrabold text-white leading-tight">
                                    Join the Tech
                                    <br />
                                    Revolution
                                </h3>
                                <p className="mt-4 text-white/85 text-sm leading-relaxed">
                                    Get exclusive access to the latest gadgets and member-only deals.
                                    The best in mobile, laptops, and more. All in one place.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/90">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-6 w-6 rounded-full bg-emerald-500/90 inline-flex items-center justify-center">
                                            <FiCheck className="text-white" />
                                        </span>
                                        2-Year Warranty
                                    </span>

                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-6 w-6 rounded-full bg-emerald-500/90 inline-flex items-center justify-center">
                                            <FiCheck className="text-white" />
                                        </span>
                                        Free Shipping
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-center"
                    >
                        <div className="w-full max-w-xl mx-auto">
                            <h1 className="text-4xl font-extrabold text-gray-900">Create Your Account</h1>
                            <p className="mt-2 text-gray-500">
                                Join thousands of tech enthusiasts getting the best deals daily.
                            </p>

                            {/* server error */}
                            {serverError && (
                                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {serverError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-2" htmlFor="fullName">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <FiUser />
                                        </span>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className={`w-full rounded-xl border px-10 py-3 outline-none transition
                        ${errors.fullName ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-emerald-200"}
                      `}
                                        />
                                    </div>
                                    {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-2" htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <FiMail />
                                        </span>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="name@example.com"
                                            className={`w-full rounded-xl border px-10 py-3 outline-none transition
                        ${errors.email ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-emerald-200"}
                      `}
                                        />
                                    </div>
                                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-2" htmlFor="password">
                                        Password
                                    </label>

                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <FiLock />
                                        </span>

                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Min. 8 characters"
                                            className={`w-full rounded-xl border px-10 py-3 pr-12 outline-none transition
                        ${errors.password ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-emerald-200"}
                      `}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((s) => !s)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>

                                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}

                                    {/* Strength bar */}
                                    {passwordStrength.level > 0 && (
                                        <div className="mt-3">
                                            <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                                                <div className={`h-full rounded-full bg-emerald-500 transition-all ${strengthWidth}`} />
                                            </div>
                                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                                <span />
                                                <span className="tracking-widest">{passwordStrength.label}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Terms */}
                                <div>
                                    <label className="flex items-center gap-3 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={agree}
                                            onChange={(e) => {
                                                setAgree(e.target.checked);
                                                if (errors.agree) setErrors((prev) => ({ ...prev, agree: "" }));
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-200"
                                        />
                                        <span>
                                            I agree to the{" "}
                                            <a href="#" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a href="#" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                                                Privacy Policy
                                            </a>
                                        </span>
                                    </label>
                                    {errors.agree && <p className="mt-2 text-sm text-red-600">{errors.agree}</p>}
                                </div>

                                {/* Submit */}
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={loading || !agree}
                                    className="w-full rounded-xl bg-emerald-500 py-3.5 font-semibold text-white shadow-sm
                             hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {loading ? "Creating Account..." : "Create Account"}
                                </motion.button>

                                {/* Divider */}
                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-xs tracking-widest text-gray-400">
                                        <span className="bg-white px-3">OR SIGN UP WITH</span>
                                    </div>
                                </div>

                                {/* Social Buttons (UI only) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className="rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Google
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Apple
                                    </button>
                                </div>

                                {/* Trust */}
                                <div className="pt-4 flex items-center justify-center gap-10 text-xs text-gray-400">
                                    <span>SECURE SSL</span>
                                    <span>SAFE PAYMENTS</span>
                                    <span>24/7 SUPPORT</span>
                                </div>

                                {/* Footer link */}
                                <p className="text-center text-sm text-gray-500 pt-4">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                                        Log in
                                    </Link>
                                </p>
                            </form>

                            <p className="mt-10 text-center text-xs text-gray-400">
                                © {new Date().getFullYear()} TechStore Electronics Inc. All rights reserved.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;
