import React from "react";
import { RiLoader2Line } from "react-icons/ri";

import "./LoadingSpinner.css";

const LoadingSpinner = ({ loading }) => {
  return (
    <div
      className="loading-modal"
      style={{ display: loading ? "flex" : "none" }}
    >
      <div className="loading-modal__content">
        <span className="loading-modal__spinner">
          <RiLoader2Line />
        </span>
        <p>Chargement...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
