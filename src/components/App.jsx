import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";

import "../styles/main.scss";
import { useAuth } from "../context/AuthContext";

const App = () => {
  const { logout } = useAuth();

  return (
    <div className="app-container">
      <BrowserRouter>
        <NavLink to="/login">Login</NavLink>

        <button onClick={logout}>Logout</button>

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
