import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface IProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { isLoggedIn } = useContext(UserContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
