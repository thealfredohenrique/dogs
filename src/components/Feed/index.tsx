import { useEffect, useState } from "react";
import { IPost } from "../../services/post";
import FeedModal from "./FeedModal";
import FeedPosts from "./FeedPosts";
import styles from "./styles.module.css";

interface IFeedProps {
  userId?: string | number;
}

const Feed = ({ userId }: IFeedProps) => {
  const [infinite, setInfinite] = useState(true);
  const [pages, setPages] = useState([1]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  useEffect(() => {
    let wait = false;

    const infiniteScroll = () => {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);

          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    };

    window.addEventListener("scroll", infiniteScroll);
    window.addEventListener("wheel", infiniteScroll);

    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [infinite]);

  return (
    <>
      {selectedPost && (
        <FeedModal
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}
      {pages.map((page) => (
        <FeedPosts
          key={page}
          page={page}
          userId={userId}
          onPostClick={setSelectedPost}
          onLoadAll={setInfinite}
        />
      ))}
    </>
  );
};

export default Feed;
