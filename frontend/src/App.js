import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import StaffDashboard from "./components/StaffDashboard";
import UploadComplaint from "./components/UploadComplaint";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {

  const location = useLocation();

  return (
    <>
      {/* Login page pe navbar nahi dikhana */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/upload" element={<UploadComplaint />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;