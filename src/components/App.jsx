import { Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { useAuth } from "../context/AuthContext";

import "../styles/main.scss";
import Test from "./pages/Test";

const App = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="app-container">
      <button onClick={logout}>Logout</button>
      <NavLink to="/dashboard">Dashboard</NavLink>

      <Routes>
        <Route path="/owner/auth" element={<Login />} />

        {currentUser && (
          <>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
