import { Dispatch, SetStateAction } from "react";
import { FormEvent, useEffect, useState } from "react";
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
  setSelectedPublication: Dispatch<SetStateAction<IPublication | null>>;
}

const FeedModal = ({
  selectedPublication,
  setSelectedPublication,
}: IFeedModalProps) => {
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

  const handleOutsideClick = (event: FormEvent) => {
    if (event.target === event.currentTarget) setSelectedPublication(null);
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error message={error} />}
      {loading && <Loading />}
      {detailedPublication && (
        <PublicationContent detailedPublication={detailedPublication} />
      )}
    </div>
  );
};

export default FeedModal;
