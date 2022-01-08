import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { IDetailedPost } from "../../../services/post";
import PostComments from "../PostComments";
import PostDelete from "../PostDelete";
import styles from "./styles.module.css";

interface IPostContentProps {
  detailedPost: IDetailedPost;
}

const PostContent = ({ detailedPost }: IPostContentProps) => {
  const { post, comments } = detailedPost;
  const { user } = useContext(UserContext);

  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <img src={post.imagePath} alt={post.name} />
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user && user.username === post.author ? (
              <PostDelete id={post.id} />
            ) : (
              <Link to={`/profile/${post.author}`}>@{post.author}</Link>
            )}
            <span className={styles.views}>{post.views}</span>
          </p>

          <h1 className="title">
            <Link to={`/post/${post.id}`}>{post.name}</Link>
          </h1>

          <ul className={styles.attributes}>
            <li>{`${post.weight}kg`}</li>
            <li>{`${post.age} ${post.age === 1 ? "year" : "years"} old`}</li>
          </ul>
        </div>
      </div>

      <PostComments id={post.id} comments={comments} />
    </div>
  );
};

export default PostContent;
