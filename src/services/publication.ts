const ENDPOINT = "https://dogsapi.origamid.dev/json";

interface IRequestCreatePublication {
  name: string;
  weight: string;
  age: string;
  imageRaw: File;
}

interface IRequestGetPublications {
  page: number;
  quantity: number;
  user: number;
}

export interface IPublication {
  id: number;
  author: string;
  date: Date;
  name: string;
  weight: number;
  age: number;
  imagePath: string;
  views: number;
  quantityComments: number;
}

export const createPublication = async ({
  name,
  weight,
  age,
  imageRaw,
}: IRequestCreatePublication) => {
  const formData = new FormData();
  formData.append("nome", name);
  formData.append("peso", weight);
  formData.append("idade", age);
  formData.append("img", imageRaw);

  await fetch(`${ENDPOINT}/api/photo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    body: formData,
  });
};

export const getPublications = async ({
  page,
  quantity,
  user,
}: IRequestGetPublications): Promise<IPublication[]> => {
  const response = await fetch(
    `${ENDPOINT}/api/photo/?_page=${page}&_total=${quantity}&_user=${user}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const data = await response.json();
  return (data as any[]).map((e) => ({
    id: e.id,
    author: e.author,
    date: new Date(e.date),
    name: e.title,
    weight: Number(e.peso),
    age: Number(e.idade),
    imagePath: e.src,
    views: Number(e.acessos),
    quantityComments: Number(e.total_comments),
  }));
};
