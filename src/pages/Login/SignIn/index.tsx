import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
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
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>Sign in</button>
      </form>

      <Link to="/login/sign-up">Sign up</Link>
    </section>
  );
};

export default SignIn;
