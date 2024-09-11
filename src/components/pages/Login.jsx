import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, error, handleErrorMsg } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(email, password);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="error">{error}</div>

        <div className="input-wrapper">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleErrorMsg(null);
            }}
          />
        </div>

        <div className="input-wrapper">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleErrorMsg(null);
            }}
          />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
