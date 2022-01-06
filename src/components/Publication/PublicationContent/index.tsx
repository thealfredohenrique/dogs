import { Link } from "react-router-dom";
import { IDetailedPublication } from "../../../services/publication";
import PublicationComments from "../PublicationComments";
import styles from "./styles.module.css";

interface IPublicationContentProps {
  detailedPublication: IDetailedPublication;
}

const PublicationContent = ({
  detailedPublication,
}: IPublicationContentProps) => {
  const { publication, comments } = detailedPublication;

  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <img src={publication.imagePath} alt={publication.name} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            <Link to={`/profile/${publication.author}`}>
              @{publication.author}
            </Link>
            <span className={styles.views}>{publication.views}</span>
          </p>
          <h1 className="title">
            <Link to={`/post/${publication.id}`}>{publication.name}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{`${publication.weight}kg`}</li>
            <li>
              {`${publication.age} ${
                publication.age === 1 ? "year" : "years"
              } old`}
            </li>
          </ul>
        </div>
      </div>
      <PublicationComments id={publication.id} comments={comments} />
    </div>
  );
};

export default PublicationContent;
