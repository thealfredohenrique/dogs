import { Dispatch, SetStateAction } from "react";
import { IPublication } from "../../../services/publication";
import styles from "./styles.module.css";

interface IFeedPublicationProps {
  publication: IPublication;
  onPublicationClick: Dispatch<SetStateAction<IPublication | null>>;
}

const FeedPublication = ({
  publication,
  onPublicationClick,
}: IFeedPublicationProps) => {
  const handleClick = () => {
    onPublicationClick(publication);
  };

  return (
    <li
      className={`${styles.publication} animationFromLeft`}
      onClick={handleClick}
    >
      <img src={publication.imagePath} alt={publication.name} />
      <span className={styles.views}>{publication.views}</span>
    </li>
  );
};

export default FeedPublication;
