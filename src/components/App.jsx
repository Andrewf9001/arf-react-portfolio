import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import "../styles/main.scss";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
