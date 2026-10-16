import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar, CreditCard, AtSign, } from "lucide-react";
import Navbar from "./Navbar";


const API = import.meta.env.VITE_API_BASE_URL;

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/15";
const readOnlyClass =
    "w-full rounded-lg border border-slate-200 bg-slate-100 py-3 pl-10 pr-4 text-sm text-slate-500 cursor-not-allowed";

function Profile() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Page eka load wenakota profile eka ganna
    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        const loadProfile = async () => {
            try {
                const res = await fetch(`${API}/profile`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }

                const data = await res.json();
                setUser(data);
                setName(data.name);
            } catch (err) {
                setError("Failed to load profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    // Name eka update karanna
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        {/*}   if (name.trim() === "") {
            setError("Name is required");
            return;
        }
*/}
        setSaving(true);
        try {
            const res = await fetch(`${API}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: name }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Update failed");
                return;
            }

            setUser(data.user);
            setName(data.user.name);
            setSuccess("Profile updated successfully");
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setSaving(false);
        }
    };



    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <p className="text-sm font-medium text-slate-500">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            {/* Profile card */}
            <main className="flex justify-center px-4 py-10">
                <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                    <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                            My Profile
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            You can only edit your name. Other details are read-only.
                        </p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-5 px-8 py-6">
                        {/* Name (editable) */}
                        <div>
                            <label htmlFor="name" className={labelClass}>Full name</label>
                            <div className="relative">
                                <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setSuccess("");
                                        setError("");
                                    }}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Username (read-only) */}
                        <div>
                            <label className={labelClass}>Username</label>
                            <div className="relative">
                                <AtSign className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input type="text" value={user?.username || "-"} readOnly className={readOnlyClass} />
                            </div>
                        </div>

                        {/* Email (read-only) */}
                        <div>
                            <label className={labelClass}>Email</label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input type="text" value={user?.email || "-"} readOnly className={readOnlyClass} />
                            </div>
                        </div>

                        {/* DOB (read-only) */}
                        <div>
                            <label className={labelClass}>Date of birth</label>
                            <div className="relative">
                                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={user?.dob ? user.dob.split("T")[0] : "-"}
                                    readOnly
                                    className={readOnlyClass}
                                />
                            </div>
                        </div>

                        {/* Phone (read-only) */}
                        <div>
                            <label className={labelClass}>Phone</label>
                            <div className="relative">
                                <Phone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input type="text" value={user?.phone || "-"} readOnly className={readOnlyClass} />
                            </div>
                        </div>

                        {/* NIC (read-only) */}
                        <div>
                            <label className={labelClass}>NIC</label>
                            <div className="relative">
                                <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input type="text" value={user?.nic || "-"} readOnly className={readOnlyClass} />
                            </div>
                        </div>

                        {/* Messages */}
                        {success && (
                            <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>
                        )}
                        {error && (
                            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
                        )}

                        {/* Save button */}
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/30 active:bg-indigo-800 disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save changes"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Profile;