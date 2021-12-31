import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createToken, getUser, IUser, validateToken } from "../services/login";

interface IUserStorageProps {
  children: ReactNode;
}

interface IUserContext {
  user: IUser | null;
  isLoggedIn: boolean;
  error: string;
  loading: boolean;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export const UserContext = createContext({} as IUserContext);

export const UserStorage = ({ children }: IUserStorageProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAutoLogin = async () => {
      const token = window.localStorage.getItem("token");

      if (token) {
        try {
          setError("");
          setLoading(true);
          await validateToken(token);
          const data = await getUser(token);
          setUser(data);
          setIsLoggedIn(true);
        } catch (error) {
          handleLogout();
        } finally {
          setLoading(false);
        }
      }
    };

    handleAutoLogin();
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setError("");
    setLoading(false);
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      setError("");
      setLoading(true);
      const token = await createToken(username, password);
      const data = await getUser(token);
      window.localStorage.setItem("token", token);
      setUser(data);
      setIsLoggedIn(true);
      navigate("/account");
    } catch (error: any) {
      setError(error.message);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, error, loading, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
