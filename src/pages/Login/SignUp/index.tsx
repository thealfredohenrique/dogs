import { FormEvent, useContext } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { UserContext } from "../../../contexts/UserContext";
import useForm from "../../../hooks/useForm";
import { createUser } from "../../../services/login";
import styles from "./styles.module.css";

const SignUp = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const { handleLogin } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (username.validate() && email.validate() && password.validate()) {
      try {
        await createUser(username.value, email.value, password.value);
        handleLogin(username.value, password.value);
      } catch (error) {
      } finally {
      }
    }
  };

  return (
    <section className="animationFromLeft">
      <h1 className="title">Sign up</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button>Register</Button>
      </form>
    </section>
  );
};

export default SignUp;
