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
  const data = await response.json();
  return data.token;
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
