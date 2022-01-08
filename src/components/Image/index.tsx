import { ImgHTMLAttributes, SyntheticEvent, useState } from "react";
import styles from "./styles.module.css";

const Image = ({ alt, ...attributes }: ImgHTMLAttributes<HTMLImageElement>) => {
  const [skeletonIsActive, setSkeletonIsActive] = useState(true);

  const handleLoad = ({ currentTarget }: SyntheticEvent<HTMLImageElement>) => {
    setSkeletonIsActive(false);
    currentTarget.style.opacity = "1";
  };

  return (
    <div className={styles.wrapper}>
      {skeletonIsActive && <div className={styles.skeleton}></div>}
      <img
        className={styles.image}
        alt={alt}
        onLoad={handleLoad}
        {...attributes}
      />
    </div>
  );
};

export default Image;
