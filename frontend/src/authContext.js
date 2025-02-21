import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a Context for authentication state
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/check", {
          withCredentials: true,
        });

        setIsAuth(res.data.isAuth);
        setUser(res.data.user);

        if (res.data.user.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        setIsAuth(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, isAdmin, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
