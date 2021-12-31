import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const AccountNavigation = () => {
  return (
    <nav>
      <NavLink to="/account">My photos</NavLink>
      <NavLink to="/account/publish">Publish</NavLink>
      <NavLink to="/account/statistics">Statistics</NavLink>
      <button>Logout</button>
    </nav>
  );
};

export default AccountNavigation;
