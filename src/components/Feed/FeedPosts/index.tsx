import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getPosts, IPost } from "../../../services/post";
import Error from "../../Error";
import FeedPost from "../FeedPost";
import Loading from "../../Loading";
import styles from "./styles.module.css";

interface IFeedPostsProps {
  onPostClick: Dispatch<SetStateAction<IPost | null>>;
}

const FeedPosts = ({ onPostClick }: IFeedPostsProps) => {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await getPosts({ page: 1, quantity: 6, user: 0 });
        setPosts(response);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (posts) {
    return (
      <ul className={styles.posts}>
        {posts.map((post) => (
          <FeedPost key={post.id} post={post} onPostClick={onPostClick} />
        ))}
      </ul>
    );
  }

  return null;
};

export default FeedPosts;
