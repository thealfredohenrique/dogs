import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login / Register</Link>
      </nav>
    </header>
  );
};

export default Header;
