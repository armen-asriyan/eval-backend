import { RiLoader2Line } from "react-icons/ri";

import "./LoadingSpinner.css";

const LoadingSpinner = ({ loading, isOverlay, fillParentVH }) => {
  return (
    <div
      className="loading-spinner"
      style={{
        display: loading ? "flex" : "none",
        position: isOverlay ? "fixed" : "relative",
        backgroundColor: isOverlay ? "rgb(0 0 0 / 50%)" : "transparent",
        marginBottom: isOverlay ? 0 : "1rem",
        top: 0,
        left: 0,
        width: "100%",
        height: fillParentVH ? "100vh" : "100%", // Full height of the screen, but stay inside the parent container
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
