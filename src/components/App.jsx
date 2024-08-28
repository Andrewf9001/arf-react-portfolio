import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";

import "../styles/main.scss";

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <NavLink to="/login">Login</NavLink>

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
