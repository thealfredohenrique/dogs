const ENDPOINT = "https://dogsapi.origamid.dev/json";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const createToken = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await fetch(`${ENDPOINT}/jwt-auth/v1/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Username or password is invalid.");

  const data = await response.json();
  return data.token;
};

export const validateToken = async (token: string): Promise<void> => {
  const response = await fetch(`${ENDPOINT}/jwt-auth/v1/token/validate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Invalid token.");
};

export const getUser = async (token: string): Promise<IUser> => {
  const response = await fetch(`${ENDPOINT}/api/user`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return {
    id: data.id,
    name: data.nome,
    username: data.username,
    email: data.email,
  };
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<boolean> => {
  const response = await fetch(`${ENDPOINT}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) throw new Error("Username or e-mail already registered.");
  else return true;
};

export const recoverPassword = async (login: string, url: string) => {
  const response = await fetch(`${ENDPOINT}/api/password/lost`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, url }),
  });

  return !!response.ok;
};
