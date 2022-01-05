const ENDPOINT = "https://dogsapi.origamid.dev/json";

interface IRequestCreatePublication {
  name: string;
  weight: string;
  age: string;
  imageRaw: File;
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
