import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/authService"; // adjust path
import { FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const justRegistered = location.state?.registered;

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
        if (serverError) setServerError("");
    };

    const validate = () => {
        const e = {};
        if (!formData.email.trim()) e.email = "Email is required";
        if (!formData.password) e.password = "Password is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        if (!validate()) return;

        setLoading(true);
        try {
            await loginApi(formData);

            const redirectTo = location.state?.from?.pathname || "/products";
            navigate(redirectTo, { replace: true });
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Invalid email or password.";
            setServerError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-md px-6 py-12">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-extrabold text-gray-900">Welcome back</h1>
                    <p className="mt-2 text-gray-500">Log in to continue.</p>

                    {justRegistered && (
                        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                            Account created. Please log in.
                        </div>
                    )}

                    {serverError && (
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label className="text-sm font-medium text-gray-800">Email</label>
                            <div className="relative mt-2">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FiMail />
                                </span>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    className={`w-full rounded-xl border px-10 py-3 outline-none ${errors.email ? "border-red-400" : "border-gray-200"
                                        }`}
                                    placeholder="name@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-800">Password</label>
                            <div className="relative mt-2">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FiLock />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                    className={`w-full rounded-xl border px-10 py-3 outline-none ${errors.password ? "border-red-400" : "border-gray-200"
                                        }`}
                                    placeholder="Your password"
                                />
                            </div>
                            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <button
                            disabled={loading}
                            className="w-full rounded-xl bg-emerald-500 py-3.5 font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Log In"}
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No account?{" "}
                            <Link to="/register" className="text-emerald-600 font-semibold">
                                Register
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
