import { Dispatch, SetStateAction } from "react";
import { IPost } from "../../../services/post";
import Image from "../../Image";
import styles from "./styles.module.css";

interface IFeedPostProps {
  post: IPost;
  onPostClick: Dispatch<SetStateAction<IPost | null>>;
}

const FeedPost = ({ post, onPostClick }: IFeedPostProps) => {
  const handleClick = () => {
    onPostClick(post);
  };

  return (
    <li className={`${styles.post} animationFromLeft`} onClick={handleClick}>
      <Image src={post.imagePath} alt={post.name} />
      <span className={styles.views}>{post.views}</span>
    </li>
  );
};

export default FeedPost;
