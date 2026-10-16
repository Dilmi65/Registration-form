import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Profile from "./profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App