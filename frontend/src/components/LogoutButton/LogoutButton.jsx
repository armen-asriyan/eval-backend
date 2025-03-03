import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../authContext";
import { RiErrorWarningLine, RiLogoutBoxLine } from "react-icons/ri";
import authRefreshApi from "../../authRefreshApi";

const apiUrl = import.meta.env.VITE_API_URL;

const Logout = ({ toggle, showMenu }) => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [isRedirecting, setRedirecting] = useState(false);

  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    showMenu(!toggle);
    // setLoading(true);

    try {
      await authRefreshApi.post(
        `${apiUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      logoutUser(); // Call logoutUser from authContext

      // setRedirecting(true);

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <li className="nav__item">
      {/* Anchor tag for consistency with other sidebar items */}
      <button
        className="nav__link logout-button"
        onClick={() => handleLogout()}
        aria-label="Nav Se deconnecter"
      >
        {error ? <RiErrorWarningLine /> : <RiLogoutBoxLine />}
      </button>
    </li>
  );
};

export default Logout;
