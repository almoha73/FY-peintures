import React, { useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });
    return unsubscribe;
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  const value = {
    currentUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
