import { Navigate, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
        return <Navigate to="/" />;
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/Login");
    };

    return (
        <nav className="w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between px-8 py-4">
                {/* Left side: name & email */}
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                        Welcome {user.name}
                    </h1>
                    <p className="text-sm text-slate-500">{user.email}</p>
                </div>

                {/* Right side: logout button */}
                <button
                    onClick={handleLogout}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-600/15"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Home;