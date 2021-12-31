import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useForm from "../../../hooks/useForm";
import { createToken } from "../../../services/login";
import styles from "./styles.module.css";

const SignIn = () => {
  const username = useForm();
  const password = useForm();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      createToken(username.value, password.value);
    }
  };

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button>Sign in</Button>
      </form>

      <Link to="/login/sign-up">Sign up</Link>
    </section>
  );
};

export default SignIn;
