import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, IDetailedPost } from "../../services/post";
import Error from "../Error";
import Head from "../Head";
import Loading from "../Loading";
import PostContent from "./PostContent";
import styles from "./styles.module.css";

const Post = () => {
  const [detailedPost, setDetailedPost] = useState<IDetailedPost | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await getPost(Number(id));
        setDetailedPost(response);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <section className="container box">
      <Head title={detailedPost?.post.name} />
      {error && <Error message={error} />}
      {loading && <Loading />}
      {detailedPost && <PostContent detailedPost={detailedPost} isSingle />}
    </section>
  );
};

export default Post;
