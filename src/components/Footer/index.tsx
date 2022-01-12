import { ReactComponent as FooterIcon } from "../../assets/footer.svg";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FooterIcon />
      <p>Dogs. Some rights reserved.</p>
    </footer>
  );
};

export default Footer;
