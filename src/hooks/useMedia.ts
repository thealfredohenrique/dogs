import { useEffect, useState } from "react";

const useMedia = (media: string) => {
  const [isMatching, setIsMatching] = useState(true);

  useEffect(() => {
    const changeIsMatching = () => {
      const { matches } = window.matchMedia(media);
      setIsMatching(matches);
    };

    changeIsMatching();
    window.addEventListener("resize", changeIsMatching);
    return () => window.removeEventListener("resize", changeIsMatching);
  }, [media]);

  return isMatching;
};

export default useMedia;
