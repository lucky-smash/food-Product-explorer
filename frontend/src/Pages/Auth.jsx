import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { Link } from "react-router-dom";

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
        }
        if (data?.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }
        setSuccess(mode === "login" ? "Login successful!" : "Registration successful! You can now log in.");
    };

    return (
        <div className="p-6 h-screen w-screen  bg-amber-300 rounded">
            <div className="flex items-center justify-between mb-6 ">

              <Link
                  to="/"
                  className="bg-white border border-amber-600 text-amber-700 px-4 py-2 rounded hover:bg-amber-100"
                >
                  back to home
                </Link>
            </div>
            <div className="mt-50 w-100 ml-100 bg-white p-6 rounded shadow">
                <div className="flex gap-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded ${mode === "login" ? "bg-amber-600 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => { setMode("login"); setError(""); }}
                    >
                        Login
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${mode === "register" ? "bg-amber-600 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => { setMode("register"); setError(""); }}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "register" && (
                        <input
                            className="border px-3 py-2 w-full rounded"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    )}

                    <input
                        className="border px-3 py-2 w-full rounded"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        className="border px-3 py-2 w-full rounded"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    {success && <p className="text-green-700 text-sm">{success}</p>}

                    <button className="w-full bg-amber-600 text-white py-2 rounded disabled:opacity-60" disabled={loading}>
                        {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
                    </button>
                </form></div>
        </div>
    );
};

export default Auth;
