import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;


function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");


    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // token naha nam login ekata
        if (!token) {
            navigate("/login");
            return;
        }

        const loadUser = async () => {
            try {
                const res = await fetch(`${API}/profile`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                // token expire / waradi nam
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.log("Profile error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch(`${API}/logout`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            // network error unath logout karanna
        }
        localStorage.removeItem("token");
        navigate("/");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <p className="text-sm text-slate-500">Loading...</p>
            </div>
        );
    }

    // Active link eka highlight karanna
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <nav className="w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-4 sm:px-8">

                {/* Left: name + email */}
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                        Welcome {user?.name}
                    </h1>
                    <p className="text-sm text-slate-500">{user?.email}</p>
                </div>

                {/* Right: links + logout, ekama div ekak athule */}
                <div className="flex items-center gap-2">
                    <NavLink to="/home" className={linkClass}>Home</NavLink>
                    <NavLink to="/profile" className={linkClass}>Profile</NavLink>

                    <button
                        onClick={handleLogout}
                        className="ml-2 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-600/15"
                    >
                        <LogOut className="h-4 w-4" />

                    </button>
                </div>
            </div>
        </nav>
    );



}
export default Navbar;