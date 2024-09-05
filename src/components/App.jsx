import { Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { useAuth } from "../context/AuthContext";

import "../styles/main.scss";
import Navbar from "./navigation/Navbar";
import Homepage from "./pages/Homepage";

/* 
  TODO: 
    - Extract logged in features
      - Dashboard
      - Form elements
    - Viewers should be able to view portfolio without logging in
*/

const App = () => {
  const { currentUser } = useAuth();

  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route path="/owner/auth" element={<Login />} />
        <Route path="/" element={<Homepage />} />

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
