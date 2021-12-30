import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/header.svg";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <header>
      <nav className="container">
        <Link to="/" className={styles.logo} aria-label="Home">
          <Logo />
        </Link>
        <Link to="/login" className={styles.login}>
          Login / Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
