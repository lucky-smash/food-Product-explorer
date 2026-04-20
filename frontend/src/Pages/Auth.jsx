import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
    const [mode, setMode] = useState("login"); // "login" or "register"
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setError("");
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        let data;
        try {
            if (mode === "login") {
                data = await loginUser(form.email, form.password);
            } else {
                data = await registerUser(form.name, form.email, form.password);
            }
        } catch (err) {
            // alert(err.message);
            setError(err.message);
            return;
        } finally {
            setLoading(false);
        }

        console.log(data);
        if (data?.token) {
            localStorage.setItem("token", data.token);
            window.dispatchEvent(new Event("food-explorer-auth"));
        }
        if (data?.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data?.token) {
            setSuccess(mode === "login" ? "Login successful! Redirecting…" : "Welcome! Redirecting…");
            navigate("/dashboard", { replace: true });
            return;
        }
        setSuccess(mode === "login" ? "Login successful!" : "Registration successful! You can now log in.");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 ">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">🍎 Food Explorer</h1>
                        <p className="text-gray-600 mt-2">Welcome back! Please sign in or create an account.</p>
                    </div>

                    <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
                        <button
                            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                                mode === "login" 
                                    ? "bg-amber-500 text-white shadow-sm" 
                                    : "text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => { setMode("login"); setError(""); }}
                        >
                            Login
                        </button>
                        <button
                            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                                mode === "register" 
                                    ? "bg-amber-600 text-white shadow-sm" 
                                    : "text-gray-300 hover:bg-gray-600"
                            }`}
                            onClick={() => { setMode("register"); setError(""); }}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === "register" && (
                            <input
                                className="border border-gray-600 bg-white text-black px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 outline-none "
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        )}

                        <input
                            className="border border-gray-300 bg-white text-black px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-amber-400 outline-none placeholder-gray-400"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="border border-gray-300 bg-white text-black px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-amber-400 outline-none placeholder-gray-400"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

                        {success && <p className="text-green-700 text-sm bg-green-50 p-3 rounded-lg">{success}</p>}

                        <button 
                            className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-60 font-medium" 
                            disabled={loading}
                        >
                            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="text-amber-400 hover:text-amber-300 font-medium"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
