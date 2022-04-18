import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context";

export const RequiresAuth = () => {
  let { authData } = useAuth();
  const location = useLocation();

  if (!authData.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};
