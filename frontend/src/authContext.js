import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// Create a Context for authentication state
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setLoading] = useState(true); // Track loading state

  // Check authentication status on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/auth/check`, {
          withCredentials: true,
        });

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

  // Helper method to log the user in and update auth state
  const loginUser = (userData) => {
    setIsAuth(true);
    setUser(userData);
  };

  // Helper method to log the user out and reset state
  const logoutUser = () => {
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, user, loginUser, logoutUser, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
