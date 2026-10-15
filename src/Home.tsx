import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    if (!user) {
        navigate("/");
    }

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>

            <button onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
            }}>
                Logout
            </button>
        </div>
    );
}

export default Home;