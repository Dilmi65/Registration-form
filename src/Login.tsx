import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";

const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700'
const inputClass = 'w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-12 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/15'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [error, setError] = useState({
        email: "",
        password: ""
    })


    const handleLogin = () => {


        const neweerror = {
            email: validatemail(email),
            password: validatpassword(password)
        }
        setError(neweerror);

        const hasError = Object.values(neweerror).some((msg) => msg !== "");
        if (hasError) {
            return;
        }


        const saved = JSON.parse(localStorage.getItem("user") || "null");

        if (!saved || saved.email !== email || saved.password !== password) {
            setError({ ...neweerror, password: "Incorrect email or password" });
            return; // stop
        }
        navigate("/Home");

    }

    const validatemail = (value: string) => {

        if (value.trimEnd() === "") {
            return "Email is empty";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Invalid email format";
        }
        return "";
    }


    const validatpassword = (value: string) => {
        if (value.trim() === "") {
            return "Password is empty";
        } else if (value.length < 8) {
            return "Password must be at least 8 characters long";
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
                <form action={handleLogin} className="px-8 py-6" onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
                    {/* Email */}
                    <div className="px-8 py-6">
                        <label htmlFor="email" className={labelClass}>
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                value={email}
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className={inputClass}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => { setError({ ...error, email: validatemail(email) }) }}
                            />
                            {error.email && (<p className="mt-1.5 text-xs text-red-500">{error.email}</p>)}
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
                                onBlur={() => { setError({ ...error, password: validatpassword(password) }) }}
                            />
                            {error.password && (<p className="mt-1.5 text-xs text-red-500">{error.password}</p>)}
                        </div>
                    </div>

                    {/* signin Button */}
                    <div className="px-8 py-6">
                        <button onClick={handleLogin}
                            type="submit"
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/30 active:bg-indigo-800"
                        >
                            Sign In
                        </button>
                    </div>

                    <p className=" text-center text-sm text-slate-500 py-8">
                        Don't have an account?{' '}
                        <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </a>
                    </p>

                </form>


            </div>
        </div>

    );
}
export default Login;