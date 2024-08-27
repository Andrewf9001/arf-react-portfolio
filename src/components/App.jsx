import { Route, Router, Routes } from "react-router-dom";
import "../styles/main.scss";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes></Routes>
      </div>
    </Router>
  );
};

export default App;
