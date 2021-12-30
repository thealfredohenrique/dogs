const ENDPOINT = "https://dogsapi.origamid.dev/json";

export const createToken = async (username: string, password: string) => {
  const response = await fetch(`${ENDPOINT}/jwt-auth/v1/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  console.log(data);
};
