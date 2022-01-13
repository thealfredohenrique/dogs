import Feed from "../../components/Feed";
import Head from "../../components/Head";

const Home = () => {
  return (
    <section className="container box">
      <Head title="Posts" />
      <Feed />
    </section>
  );
};

export default Home;
