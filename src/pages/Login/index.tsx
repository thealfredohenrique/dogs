import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import styles from "./styles.module.css";

const Login = () => {
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) return <Navigate to="/account" />;

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default Login;
