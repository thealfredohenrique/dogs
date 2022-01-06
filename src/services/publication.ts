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

export interface IComment {
  id: number;
  agent: string;
  approved: string;
  author: string;
  authorEmail: string;
  authorIP: string;
  authorURL: string;
  content: string;
  date: Date;
  publication: number;
  type: string;
  userID: number;
}

export interface IDetailedPublication {
  publication: IPublication;
  comments: IComment[];
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

export const getPublication = async (
  id: number
): Promise<IDetailedPublication> => {
  const response = await fetch(`${ENDPOINT}/api/photo/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await response.json();
  return {
    publication: {
      id: data.photo.id,
      author: data.photo.author,
      date: new Date(data.photo.date),
      name: data.photo.title,
      weight: Number(data.photo.peso),
      age: Number(data.photo.idade),
      imagePath: data.photo.src,
      views: Number(data.photo.acessos),
      quantityComments: Number(data.photo.total_comments),
    },
    comments: (data.comments as any[]).map((comment) => ({
      id: Number(comment.comment_ID),
      agent: comment.comment_agent,
      approved: comment.comment_approved,
      author: comment.comment_author,
      authorEmail: comment.comment_author_email,
      authorIP: comment.comment_author_IP,
      authorURL: comment.comment_author_url,
      content: comment.comment_content,
      date: new Date(comment.comment_date),
      publication: Number(comment.comment_post_ID),
      type: comment.comment_type,
      userID: Number(comment.user_id),
    })),
  };
};
