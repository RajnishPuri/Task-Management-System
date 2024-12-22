import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from "./Pages/LandingPage";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashBoard";

function App() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setRole(decodedToken.role);
      navigate(role === 'admin' ? '/admin' : '/user');
    } else {
      setRole(null);
    }
  }, [navigate]);

  const AdminRoute = ({ element }) => {
    if (role !== 'admin') {
      return <Navigate to="/" />;
    }
    return element;
  };

  const UserRoute = ({ element }) => {
    if (!role) {
      return <Navigate to="/login" />;
    }
    return element;
  };

  return (
    <div className="w-screen h-screen bg-custom-gradient overflow-auto">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
        <Route path="/user" element={<UserRoute element={<UserDashboard />} />} />

      </Routes>
    </div >
  );
}

export default App;
