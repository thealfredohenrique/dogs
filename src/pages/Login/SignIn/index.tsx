import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { createToken } from "../../../services/login";
import styles from "./styles.module.css";

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    createToken(username, password);
  };

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" />
        <Input label="Password" type="password" name="password" />
        <Button>Sign in</Button>
      </form>

      <Link to="/login/sign-up">Sign up</Link>
    </section>
  );
};

export default SignIn;
