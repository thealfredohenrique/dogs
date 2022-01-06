import { useEffect, useState } from "react";
import {
  getPublication,
  IDetailedPublication,
  IPublication,
} from "../../../services/publication";
import Error from "../../Error";
import Loading from "../../Loading";
import PublicationContent from "../../Publication/PublicationContent";
import styles from "./styles.module.css";

interface IFeedModalProps {
  selectedPublication: IPublication;
}

const FeedModal = ({ selectedPublication }: IFeedModalProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailedPublication, setDetailedPublication] =
    useState<IDetailedPublication | null>(null);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        setError("");
        setLoading(true);

        const response = await getPublication(selectedPublication.id);
        setDetailedPublication(response);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [selectedPublication]);

  return (
    <div className={styles.modal}>
      {error && <Error message={error} />}
      {loading && <Loading />}
      {detailedPublication && (
        <PublicationContent detailedPublication={detailedPublication} />
      )}
    </div>
  );
};

export default FeedModal;
