import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700'
const inputClass = 'w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-12 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/15'

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const navigate = useNavigate();

    const [error, setError] = useState({
        username: "",
        password: ""
    })

    //async kiyanne function ekakata “meka athule wait karanna ona deval thiyenawa” kiyala kiyana word ekak.
    const handleLogin = async () => {

        //validation
        const newerror = {
            username: validateUsername(username),
            password: validatePassword(password)
        }
        setError(newerror);

        const hasError = Object.values(newerror).some((msg) => msg !== "");
        if (hasError) {
            return;
        }


        //API call
        setApiError("");
        setLoading(true);

        try {
            const res = await fetch(`${API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setApiError(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);
            navigate("/Profile");
        } catch (error) {
            console.log("Login error:", error);
            setApiError("Network error. Please try again.");

        } finally {
            setLoading(false);
        }
    }

    const validateUsername = (value: string) => {

        if (value.trim() === "") {
            return "Username is empty";
        }
        return "";
    }


    const validatePassword = (value: string) => {
        if (value.trim() === "") {
            return "Password is empty";
        } else if (value.length < 6) {
            return "Password must be at least 6 characters long";
        }
        return "";
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                {/* Header */}
                <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Welcome Back
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Sign in to access your account and manage your tasks efficiently.
                    </p>
                </div>

                {/* Form */}
                <form className="px-8 py-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>                    {/* Email */}
                    <div className="px-8 py-6">
                        <label htmlFor="email" className={labelClass}>
                            Username
                        </label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                value={username}
                                id="username"
                                type="text"
                                placeholder="use first name as username "
                                className={inputClass}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={() => { setError({ ...error, username: validateUsername(username) }) }}
                            />
                            {error.username && (<p className="mt-1.5 text-xs text-red-500">{error.username}</p>)}
                        </div>
                    </div >

                    {/* Password */}
                    <div className="px-8 py-3">
                        <label htmlFor="password" className={labelClass}>
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                value={password}
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className={inputClass}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => { setError({ ...error, password: validatePassword(password) }) }}
                            />
                            {error.password && (<p className="mt-1.5 text-xs text-red-500">{error.password}</p>)}
                        </div>
                    </div>

                    {/* signin Button */}

                    {apiError && (
                        <p className="mx-8 mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{apiError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/30 active:bg-indigo-800 disabled:opacity-60"
                    >
                        {loading ? "Please wait..." : "Sign In"}
                    </button>

                    <p className=" text-center text-sm text-slate-500 py-8">
                        Don't have an account?{' '}
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </a>
                    </p>

                </form>


            </div>
        </div>

    );
}
export default Login;