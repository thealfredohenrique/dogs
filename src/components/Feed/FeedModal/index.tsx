import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getPost, IDetailedPost, IPost } from "../../../services/post";
import Error from "../../Error";
import Loading from "../../Loading";
import PostContent from "../../Post/PostContent";
import styles from "./styles.module.css";

interface IFeedModalProps {
  selectedPost: IPost;
  setSelectedPost: Dispatch<SetStateAction<IPost | null>>;
}

const FeedModal = ({ selectedPost, setSelectedPost }: IFeedModalProps) => {
  const [detailedPost, setDetailedPost] = useState<IDetailedPost | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await getPost(selectedPost.id);
        setDetailedPost(response);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [selectedPost]);

  const handleOutsideClick = (event: FormEvent) => {
    if (event.target === event.currentTarget) setSelectedPost(null);
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error message={error} />}
      {loading && <Loading />}
      {detailedPost && <PostContent detailedPost={detailedPost} />}
    </div>
  );
};

export default FeedModal;
