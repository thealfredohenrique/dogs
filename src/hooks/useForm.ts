import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export interface IUseForm {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  onBlur: () => boolean;
  validate: () => boolean;
}

interface ITypes {
  [index: string]: {
    regex: RegExp;
    message: string;
  };
}

const types: ITypes = {
  email: {
    regex:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Enter a valid email address",
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    message:
      "The password must contain at least eight characters, at least one uppercase letter, one lowercase letter and one number",
  },
};

const useForm = (type?: string | false): IUseForm => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    if (error) validate(event.currentTarget.value);
    setValue(event.currentTarget.value);
  };

  const validate = (value: string) => {
    if (typeof type === "boolean" && !type) return true;

    if (!value.length) {
      setError("Enter a value");
      return false;
    }

    if (type && types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    }

    setError("");
    return true;
  };

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};

export default useForm;
