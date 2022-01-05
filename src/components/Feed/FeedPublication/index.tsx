import { IPublication } from "../../../services/publication";
import styles from "./styles.module.css";

interface IFeedPublicationProps {
  publication: IPublication;
}

const FeedPublication = ({ publication }: IFeedPublicationProps) => {
  return (
    <li className={`${styles.publication} animationFromLeft`}>
      <img src={publication.imagePath} alt={publication.name} />
      <span className={styles.views}>{publication.views}</span>
    </li>
  );
};

export default FeedPublication;
