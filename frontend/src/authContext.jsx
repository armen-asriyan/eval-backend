// authContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import authRefreshApi from "./authRefreshApi";

const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authRefreshApi.get(`${apiUrl}/api/auth/check`);
        setIsAuth(res.data.isAuth);
        setUser(res.data.user);
      } catch (err) {
        setIsAuth(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginUser = (userData) => {
    setIsAuth(true);
    setUser(userData);
  };

  const logoutUser = async () => {
    try {
      await authRefreshApi.post(`${apiUrl}/api/auth/logout`);
      setIsAuth(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, user, loginUser, logoutUser, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
