import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../../services/post";
import Error from "../../Error";
import styles from "./styles.module.css";

interface IPostDeleteProps {
  id: number;
}

const PostDelete = ({ id }: IPostDeleteProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const confirm = window.confirm("Are you sure you want to delete the post?");

    if (confirm) {
      try {
        setError("");
        setLoading(true);
        await deletePost(id);
        navigate("/");
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <button
        className={styles.delete}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      <Error message={error} />
    </>
  );
};

export default PostDelete;
