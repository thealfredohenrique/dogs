import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Feed from "../../components/Feed";
import { UserContext } from "../../contexts/UserContext";
import NotFound from "../NotFound";
import AccountHeader from "./AccountHeader";
import Publish from "./Publish";
import Statistics from "./Statistics";
import styles from "./styles.module.css";

const Account = () => {
  const { user } = useContext(UserContext);

  return (
    <section className="container">
      <AccountHeader />
      <Routes>
        <Route path="/" element={<Feed userId={user?.id} />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Account;
