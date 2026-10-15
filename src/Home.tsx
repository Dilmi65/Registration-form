import { Navigate, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
        return <Navigate to="/" />;
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;