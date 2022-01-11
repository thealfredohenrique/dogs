const ENDPOINT = "https://dogsapi.origamid.dev/json";

interface IRequestCreatePost {
  name: string;
  weight: string;
  age: string;
  imageRaw: File;
}

interface IRequestGetPosts {
  page: number;
  quantity: number;
  userId?: string | number;
}

export interface IPost {
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
  post: number;
  type: string;
  userID: number;
}

export interface IDetailedPost {
  post: IPost;
  comments: IComment[];
}

export const createPost = async ({
  name,
  weight,
  age,
  imageRaw,
}: IRequestCreatePost) => {
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

export const getPosts = async ({
  page,
  quantity,
  userId,
}: IRequestGetPosts): Promise<IPost[]> => {
  const response = await fetch(
    `${ENDPOINT}/api/photo/?_page=${page}&_total=${quantity}&_user=${userId}`,
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

export const getPost = async (id: number): Promise<IDetailedPost> => {
  const response = await fetch(`${ENDPOINT}/api/photo/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Post not found.");
  const data = await response.json();
  return {
    post: {
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
      post: Number(comment.comment_post_ID),
      type: comment.comment_type,
      userID: Number(comment.user_id),
    })),
  };
};

export const deletePost = async (id: number) => {
  const response = await fetch(`${ENDPOINT}/api/photo/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Could not delete the post.");
};

export const createComment = async (
  id: number,
  comment: string
): Promise<IComment> => {
  const response = await fetch(`${ENDPOINT}/api/comment/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ comment }),
  });
  if (!response.ok) throw new Error("Could not save comment.");
  const data = await response.json();
  return {
    id: Number(data.comment_ID),
    agent: data.comment_agent,
    approved: data.comment_approved,
    author: data.comment_author,
    authorEmail: data.comment_author_email,
    authorIP: data.comment_author_IP,
    authorURL: data.comment_author_url,
    content: data.comment_content,
    date: new Date(data.comment_date),
    post: Number(data.comment_post_ID),
    type: data.comment_type,
    userID: Number(data.user_id),
  };
};
