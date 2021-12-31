import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import useMedia from "../../../hooks/useMedia";
import { ReactComponent as FeedIcon } from "../../../assets/feed.svg";
import { ReactComponent as AddIcon } from "../../../assets/add.svg";
import { ReactComponent as StatisticsIcon } from "../../../assets/statistics.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/logout.svg";
import styles from "./styles.module.css";

const AccountNavigation = () => {
  const isMobile = useMedia("(max-width: 40rem)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleLogout } = useContext(UserContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {isMobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            isMenuOpen && styles.mobileButtonActive
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></button>
      )}
      <nav
        className={`${isMobile ? styles.navMobile : styles.nav} ${
          isMenuOpen && styles.navMobileActive
        }`}
      >
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
    </>
  );
};

export default AccountNavigation;
