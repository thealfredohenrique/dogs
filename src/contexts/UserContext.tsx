import { createContext, ReactNode, useState } from "react";
import { createToken, getUser, IUser } from "../services/login";

interface IUserStorageProps {
  children: ReactNode;
}

interface IUserContext {
  user: IUser | null;
  handleLogin: (username: string, password: string) => Promise<void>;
}

export const UserContext = createContext({} as IUserContext);

export const UserStorage = ({ children }: IUserStorageProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, seIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      const token = await createToken(username, password);
      const data = await getUser(token);

      window.localStorage.setItem("token", token);

      setUser(data);
      seIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};
