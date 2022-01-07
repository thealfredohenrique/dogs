import { IComment } from "../../../services/post";
import styles from "./styles.module.css";

interface IPostCommentsProps {
  id: number;
  comments: IComment[];
}

const PostComments = ({ id, comments }: IPostCommentsProps) => {
  return <></>;
};

export default PostComments;
