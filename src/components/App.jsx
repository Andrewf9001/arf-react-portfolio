import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Navbar from "./navigation/Navbar";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Login from "./pages/Login";

import { useAuth } from "../context/AuthContext";

import "../styles/main.scss";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />

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
