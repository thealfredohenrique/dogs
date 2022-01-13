import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Error from "../../../components/Error";
import Head from "../../../components/Head";
import Input from "../../../components/Input";
import useForm from "../../../hooks/useForm";
import { resetPassword } from "../../../services/login";
import styles from "./styles.module.css";

const ResetPassword = () => {
  const [key, setKey] = useState("");
  const [login, setLogin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const password = useForm("password");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password.validate()) {
      try {
        setError("");
        setLoading(true);
        const response = await resetPassword(key, login, password.value);
        if (response) navigate("/login");
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="animationFromLeft">
      <Head title="Reset password" />
      <h1 className="title">Reset password</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="New password"
          type="password"
          name="password"
          {...password}
        />
        <Button disabled={loading}>{loading ? "Resetting..." : "Reset"}</Button>
      </form>
      <Error message={error} />
    </section>
  );
};

export default ResetPassword;
