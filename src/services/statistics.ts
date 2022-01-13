const ENDPOINT = "https://dogsapi.origamid.dev/json";

export interface IStatistics {
  id: number;
  name: string;
  views: number;
}

export const getStatistics = async (): Promise<IStatistics[]> => {
  const response = await fetch(`${ENDPOINT}/api/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();

  return (data as any[]).map(
    (e) =>
      ({
        id: e.id,
        name: e.title,
        views: Number(e.acessos),
      } as IStatistics)
  );
};
