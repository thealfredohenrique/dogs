import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import styles from "./styles.module.css";

const AccountHeader = () => {
  const [title, setTitle] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case "/account/publish":
        setTitle("Publish");
        break;
      case "/account/statistics":
        setTitle("Statistics");
        break;
      default:
        setTitle("My account");
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <AccountNavigation />
    </header>
  );
};

export default AccountHeader;
