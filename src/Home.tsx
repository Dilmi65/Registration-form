import Navbar from "./Navbar"

function Home() {



    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <main className="p-8">
                <h2 className="text-2xl font-semibold text-slate-900">Home</h2>
                <p className="mt-2 text-slate-500">Welcome to your dashboard.</p>
            </main>
        </div>
    );
}

export default Home;