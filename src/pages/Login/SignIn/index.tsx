import { FormEvent, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Error from "../../../components/Error";
import Input from "../../../components/Input";
import { UserContext } from "../../../contexts/UserContext";
import useForm from "../../../hooks/useForm";
import styles from "./styles.module.css";

const SignIn = () => {
  const username = useForm();
  const password = useForm();
  const { error, loading, handleLogin } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      await handleLogin(username.value, password.value);
    }
  };

  return (
    <section className="animationFromLeft">
      <h1 className="title">Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button disabled={loading}>{loading ? "Loading" : "Sign in"}</Button>
        <Error message={error} />
      </form>

      <Link className={styles.forgotPassword} to="/login/forgot-password">
        Forgot password?
      </Link>

      <div className={styles.register}>
        <h2 className={styles.subtitle}>Register</h2>
        <p>Don't have an account yet? Register on the site.</p>
        <Link className={styles.signUp} to="/login/sign-up">
          Sign up
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
