import { useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/header.svg";
import { UserContext } from "../../contexts/UserContext";
import styles from "./styles.module.css";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo} aria-label="Home">
          <Logo />
        </Link>
        {user ? (
          <Link to="/account" className={styles.login}>
            {user.name}
          </Link>
        ) : (
          <Link to="/login" className={styles.login}>
            Login / Register
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
