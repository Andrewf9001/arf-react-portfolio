import { Routes, Route } from "react-router-dom";

import PortfolioManager from "./pages/PortfiolioManager";
import Navbar from "./navigation/Navbar";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";
import About from "./pages/About";
import Login from "./pages/Login";

import { AppDataProvider } from "../context/AppDataContext";
import { useAuth } from "../context/AuthContext";

import { solidIcons } from "../assets/icons/solidIcons";
import "../styles/main.scss";

solidIcons();

const App = () => {
  const { currentUser } = useAuth();

  return (
    <div className="app-container">
      <AppDataProvider>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />

          <Route path="/project/:projectId" element={<Project />} />

          <Route path="/owner/auth" element={<Login />} />

          {currentUser && (
            <>
              <Route path="/portfolio-manager" element={<PortfolioManager />} />
            </>
          )}
        </Routes>
      </AppDataProvider>
    </div>
  );
};

export default App;
