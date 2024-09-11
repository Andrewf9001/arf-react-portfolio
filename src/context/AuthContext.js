import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleErrorMsg = (value) => {
    setError(value);
  };

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError(null);
        return auth && navigate("/");
      })
      .catch((err) => {
        console.error("Login Error: ", err);
        setError("Invalid Email / Password");
      });
  };

  const logout = async () => {
    return signOut(auth).finally(() => navigate("/"));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const values = {
    currentUser,
    error,
    signIn,
    logout,
    handleErrorMsg,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
