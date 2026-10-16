import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Navbar from './Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App