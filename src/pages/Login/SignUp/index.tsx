import { FormEvent, useContext, useState } from "react";
import Button from "../../../components/Button";
import Error from "../../../components/Error";
import Head from "../../../components/Head";
import Input from "../../../components/Input";
import { UserContext } from "../../../contexts/UserContext";
import useForm from "../../../hooks/useForm";
import { createUser } from "../../../services/login";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const { handleLogin } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (username.validate() && email.validate() && password.validate()) {
      try {
        setError("");
        setLoading(true);

        await createUser(username.value, email.value, password.value);
        handleLogin(username.value, password.value);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="animationFromLeft">
      <Head title="Sign up" />
      <h1 className="title">Sign up</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Password" type="password" name="password" {...password} />
        <Button disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>
        <Error message={error} />
      </form>
    </section>
  );
};

export default SignUp;
