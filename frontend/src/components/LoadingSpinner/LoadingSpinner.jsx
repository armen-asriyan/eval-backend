import React from "react";
import { RiLoader2Line } from "react-icons/ri";

import "./LoadingSpinner.css";

const LoadingSpinner = ({ loading, fullscreen }) => {
  return (
    <div
      className="loading-spinner"
      style={{
        display: loading ? "flex" : "none",
        position: fullscreen ? "fixed" : "relative",
        backgroundColor: fullscreen ? "rgb(0 0 0 / 50%)" : "transparent",
      }}
    >
      <div className="loading-spinner__content">
        <span className="loading-spinner__spinner">
          <RiLoader2Line />
        </span>
        <p>Chargement...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
