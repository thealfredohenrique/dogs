import { useEffect } from "react";

interface IHeadProps {
  title?: string;
  description?: string;
}

const Head = ({ title, description }: IHeadProps) => {
  useEffect(() => {
    const defaultTitle = "Dogs";
    document.title = title ? `${defaultTitle} | ${title}` : defaultTitle;

    const defaultDescription = "Dogs, the social media for dogs";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description ?? defaultDescription
      );
    }
  }, [title, description]);

  return <></>;
};

export default Head;
