import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { createComment, IComment } from "../../../services/post";
import Error from "../../Error";
import { ReactComponent as Send } from "../../../assets/send.svg";
import styles from "./styles.module.css";

interface IPostCommentProps {
  id: number;
  onSubmitComment: Dispatch<SetStateAction<IComment[]>>;
}

const PostComment = ({ id, onSubmitComment }: IPostCommentProps) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setComment(event.currentTarget.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setError("");
      const response = await createComment(id, comment);
      onSubmitComment((comments) => [...comments, response]);
      setComment("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        name="comment"
        id="comment"
        className={styles.textarea}
        placeholder="Type a comment"
        value={comment}
        onChange={handleChange}
      ></textarea>
      <button className={styles.button}>
        <Send />
      </button>
      {error && <Error message={error} />}
    </form>
  );
};

export default PostComment;
