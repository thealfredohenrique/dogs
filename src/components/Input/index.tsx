import { HTMLInputTypeAttribute } from "react";
import { IUseForm } from "../../hooks/useForm";
import styles from "./styles.module.css";

interface IInputProps extends IUseForm {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
}

const Input = ({
  label,
  name,
  type,
  value,
  error,
  onChange,
  onBlur,
}: IInputProps) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={styles.input}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
