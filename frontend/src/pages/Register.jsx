import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { register as registerApi } from "../api/authApi";




const Register = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [agree, setAgree] = useState(false);
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
        if (serverError) setServerError("");
    };

    const validate = () => {
        const e = {};
        const nameParts = formData.fullName.trim().split(/\s+/).filter(Boolean);
        if (!formData.fullName.trim()) e.fullName = "Full name is required";
        else if (formData.fullName.trim().length < 3) e.fullName = "Min 3 characters";
        else if (nameParts.length < 2) e.fullName = "Enter first and last name";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) e.email = "Email is required";
        else if (!emailRegex.test(formData.email)) e.email = "Invalid email";

        if (!formData.password) e.password = "Password is required";
        else if (formData.password.length < 8) e.password = "Min 8 characters";

        if (!formData.confirmPassword) e.confirmPassword = "Confirm your password";
        else if (formData.password !== formData.confirmPassword)
            e.confirmPassword = "Passwords do not match";

        if (!agree) e.agree = "Accept Terms & Privacy";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // Parse Spring validation errors (optional)
    const extractServerMessage = (data) => {
        if (!data) return "Registration failed";
        if (typeof data.message === "string") return data.message;
        // common patterns:
        // {errors: {field: msg}} or {errors: ["..."]}
        if (data.errors && typeof data.errors === "object") {
            const firstKey = Object.keys(data.errors)[0];
            if (firstKey) return data.errors[firstKey];
        }
        return "Registration failed. Please try again.";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        if (!validate()) return;

        setLoading(true);
        try {
            const nameParts = formData.fullName.trim().split(/\s+/).filter(Boolean);
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ");

            await registerApi({
                firstName,
                lastName,
                email: formData.email,
                password: formData.password,
            });

            // success
            navigate("/login", { state: { registered: true } });
        } catch (err) {
            const data = err?.response?.data;
            setServerError(extractServerMessage(data));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-xl px-6 py-10">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-extrabold text-gray-900">Create Your Account</h1>
                    <p className="mt-2 text-gray-500">Join TechStore and start shopping.</p>

                    {serverError && (
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">Full Name</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FiUser />
                                </span>
                                <input
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={`w-full rounded-xl border px-10 py-3 outline-none transition
                    ${errors.fullName ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-emerald-200"}`}
                                />
                            </div>
                            {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FiMail />
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className={`w-full rounded-xl border px-10 py-3 outline-none transition
                    ${errors.email ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-emerald-200"}`}
                                />
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FiLock />
                                </span>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Min. 8 characters"
                                    className={`w-full rounded-xl border px-10 py-3 pr-12 outline-none transition
                    ${errors.password ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-emerald-200"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">Confirm Password</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FiLock />
                                </span>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className={`w-full rounded-xl border px-10 py-3 outline-none transition
                    ${errors.confirmPassword ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-emerald-200"}`}
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms */}
                        <div>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => {
                                        setAgree(e.target.checked);
                                        if (errors.agree) setErrors((p) => ({ ...p, agree: "" }));
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-200"
                                />
                                I agree to Terms and Privacy Policy
                            </label>
                            {errors.agree && <p className="mt-2 text-sm text-red-600">{errors.agree}</p>}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading || !agree}
                            className="w-full rounded-xl bg-emerald-500 py-3.5 font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </motion.button>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700">
                                Log in
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
