import AccountNavigation from "../AccountNavigation";
import styles from "./styles.module.css";

const AccountHeader = () => {
  return (
    <header>
      <h1 className="title">AccountHeader</h1>
      <AccountNavigation />
    </header>
  );
};

export default AccountHeader;
