import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

import { useAuth } from "../context/AuthContext";

import "../styles/main.scss";
import Test from "./pages/Test";

const App = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="app-container">
      <button onClick={logout}>Logout</button>

      <Routes>
        <Route path="/owner/auth" element={<Login />} />

        {currentUser && (
          <>
            <Route exact path="/dashboard" element={<Home />} />
            <Route path="/test" element={<Test />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
