import { FormEvent, useState } from "react";
import Button from "../../../components/Button";
import Error from "../../../components/Error";
import Head from "../../../components/Head";
import Input from "../../../components/Input";
import useForm from "../../../hooks/useForm";
import { recoverPassword } from "../../../services/login";

const ForgotPassword = () => {
  const login = useForm();
  const [emailWasSent, setEmailWasSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (login.validate()) {
      try {
        setError("");
        setLoading(true);
        const response = await recoverPassword(
          login.value,
          `${window.location.origin}/login/reset-password`
        );
        setEmailWasSent(response);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="animationFromLeft">
      <Head title="Forgot password" />
      <h1 className="title">Forgot password?</h1>

      {emailWasSent ? (
        <p style={{ color: "#4c1" }}>Email sent.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email or user" type="text" name="login" {...login} />
          <Button disabled={loading}>
            {loading ? "Loading..." : "Send email"}
          </Button>
        </form>
      )}

      <Error message={error} />
    </section>
  );
};

export default ForgotPassword;
