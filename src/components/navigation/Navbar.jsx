import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="navbar-container">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>

      {currentUser && (
        <>
          <div className="left-column-wrapper">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </div>

          <div className="right-column-wrapper">
            <button onClick={logout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
