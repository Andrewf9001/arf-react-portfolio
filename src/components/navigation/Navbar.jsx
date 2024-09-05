import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="navbar-container">
      <div className="left-column">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      {currentUser && (
        <div className="right-column">
          <div className="left-column-wrapper">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </div>

          <div className="right-column-wrapper">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
