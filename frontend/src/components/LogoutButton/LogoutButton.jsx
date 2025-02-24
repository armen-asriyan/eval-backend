import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useAuth } from "../../authContext";
import { RiErrorWarningLine, RiLogoutBoxLine } from "react-icons/ri";

const apiUrl = process.env.REACT_APP_API_URL;

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
      await axios.post(
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
      <a
        className="nav__link logout-button"
        onClick={() => handleLogout()}
        aria-label="Nav Se deconnecter"
      >
        {error ? <RiErrorWarningLine /> : <RiLogoutBoxLine />}
      </a>
    </li>
  );
};

export default Logout;
