import { IComment } from "../../../services/publication";
import styles from "./styles.module.css";

interface IPublicationCommentsProps {
  id: number;
  comments: IComment[];
}

const PublicationComments = ({ id, comments }: IPublicationCommentsProps) => {
  return <></>;
};

export default PublicationComments;
