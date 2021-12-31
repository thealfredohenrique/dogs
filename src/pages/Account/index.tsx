import { Route, Routes } from "react-router-dom";
import Feed from "../../components/Feed";
import AccountHeader from "./AccountHeader";
import Publish from "./Publish";
import Statistics from "./Statistics";
import styles from "./styles.module.css";

const Account = () => {
  return (
    <section className="container">
      <AccountHeader />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </section>
  );
};

export default Account;
