import { useEffect, useState } from "react";
import { getPublications, IPublication } from "../../../services/publication";
import Error from "../../Error";
import Loading from "../../Loading";
import FeedPublication from "../FeedPublication";
import styles from "./styles.module.css";

const FeedPublications = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [publications, setPublications] = useState<IPublication[] | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setError("");
        setLoading(true);

        const response = await getPublications({
          page: 1,
          quantity: 6,
          user: 0,
        });

        setPublications(response);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  if (error) {
    return <Error message={error} />;
  }
  if (loading) {
    return <Loading />;
  }
  if (publications) {
    return (
      <ul className={styles.publications}>
        {publications.map((publication) => (
          <FeedPublication key={publication.id} publication={publication} />
        ))}
      </ul>
    );
  }

  return null;
};

export default FeedPublications;
