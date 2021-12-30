import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...attributes }: IButtonProps) => {
  return (
    <button className={styles.button} {...attributes}>
      {children}
    </button>
  );
};

export default Button;
