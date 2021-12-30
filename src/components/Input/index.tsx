import { HTMLInputTypeAttribute } from "react";
import styles from "./styles.module.css";

interface IInputProps {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
}

const Input = ({ label, name, type }: IInputProps) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input type={type} name={name} id={name} className={styles.input} />
      <span className={styles.error}>Error</span>
    </div>
  );
};

export default Input;
