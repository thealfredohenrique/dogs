import styles from "./styles.module.css";

interface IErrorProps {
  message: string;
}

const Error = ({ message }: IErrorProps) => {
  if (!message) return null;
  return <span className={styles.error}>{message}</span>;
};

export default Error;
