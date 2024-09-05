import { Route } from "react-router-dom";
import Login from "../pages/Login";

const AuthContainer = () => {
  return (
    <>
      <Route path="/owner/auth" element={<Login />} />
    </>
  );
};

export default AuthContainer;
