import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Error from "../../../components/Error";
import Input from "../../../components/Input";
import useForm from "../../../hooks/useForm";
import { createPost } from "../../../services/post";
import styles from "./styles.module.css";

interface IFormImage {
  preview: string;
  raw: File;
}

const Publish = () => {
  const name = useForm();
  const weight = useForm("number");
  const age = useForm("number");
  const [image, setImage] = useState<IFormImage | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (name.validate() && weight.validate() && age.validate() && image?.raw) {
      try {
        setError("");
        setLoading(true);
        await createPost({
          name: name.value,
          weight: weight.value,
          age: age.value,
          imageRaw: image.raw,
        });
        navigate("/account");
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setImage({
        preview: URL.createObjectURL(event.currentTarget.files[0]),
        raw: event.currentTarget.files[0],
      });
    }
  };

  return (
    <section className={`${styles.publish} animationFromLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" name="name" {...name} />
        <Input label="Weight" type="number" name="weight" {...weight} />
        <Input label="Age" type="number" name="age" {...age} />
        <input
          type="file"
          className={styles.file}
          name="image"
          id="image"
          onChange={handleImageChange}
        />
        <Button disabled={loading}>{loading ? "Loading..." : "Send"}</Button>
        <Error message={error} />
      </form>

      <div>
        {image?.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url("${image.preview}")` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default Publish;
