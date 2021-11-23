import React from "react";
import { authProvider } from "../lib/auth";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const persistedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [user, setUser] = React.useState(persistedUser);
  const [error, setError] = React.useState(null);

  let signin = (email, password, callback) => {
    setUser(null);
    setError(null);
    return authProvider.signin(email, password, (user, error) => {
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user);
      setError(error);
      callback();
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      setError(null);
      callback();
    });
  };

  let value = { user, error, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth };
