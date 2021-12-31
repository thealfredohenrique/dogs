import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { ReactComponent as FeedIcon } from "../../../assets/feed.svg";
import { ReactComponent as AddIcon } from "../../../assets/add.svg";
import { ReactComponent as StatisticsIcon } from "../../../assets/statistics.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/logout.svg";
import styles from "./styles.module.css";

const AccountNavigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { handleLogout } = useContext(UserContext);

  return (
    <nav className={styles.nav}>
      <NavLink to="/account" end>
        <FeedIcon /> {isMobile && "My photos"}
      </NavLink>
      <NavLink to="/account/publish">
        <AddIcon /> {isMobile && "Publish"}
      </NavLink>
      <NavLink to="/account/statistics">
        <StatisticsIcon /> {isMobile && "Statistics"}
      </NavLink>
      <button onClick={handleLogout}>
        <LogoutIcon /> {isMobile && "Logout"}
      </button>
    </nav>
  );
};

export default AccountNavigation;
