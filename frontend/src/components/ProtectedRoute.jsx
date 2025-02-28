import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../authContext";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

const ProtectedRoute = () => {
  const { isAuth, authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuth) {
      navigate("/login", { replace: true });
    }
  }, [authLoading, isAuth, navigate]);

  if (authLoading) {
    return (
      <LoadingSpinner
        loading={authLoading}
        isOverlay={false}
        fillParentVH={true}
      />
    );
  }

  // Outlet is used to render nested routes,
  return isAuth ? <Outlet /> : null; // Returning null is fine cause we redirect to login
};

export default ProtectedRoute;
