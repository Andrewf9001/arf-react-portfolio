import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="navbar-container">
      <div className="left-column">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>

        {currentUser && (
          <NavLink to="/portfolio-manager">Portfolio Manager</NavLink>
        )}
      </div>

      {currentUser && (
        <div className="right-column">
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
