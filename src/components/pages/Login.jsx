import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, currentUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(email, password);

    if (currentUser) {
      Navigate("/");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
