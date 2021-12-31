import { FormEvent, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
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
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button disabled={loading}>{loading ? "Loading" : "Sign in"}</Button>
        {error && <span>{error}</span>}
      </form>

      <Link to="/login/sign-up">Sign up</Link>
    </section>
  );
};

export default SignIn;
