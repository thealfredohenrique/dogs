import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import styles from "./styles.module.css";

const Login = () => {
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
