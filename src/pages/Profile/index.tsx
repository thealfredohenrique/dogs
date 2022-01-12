import { useParams } from "react-router-dom";
import Feed from "../../components/Feed";
import Head from "../../components/Head";
import styles from "./styles.module.css";

const Profile = () => {
  const { id } = useParams();

  return (
    <section className="container box">
      <Head title={id} />
      <h1 className="title">{id}</h1>
      <Feed userId={id} />
    </section>
  );
};

export default Profile;
