import { useState } from "react";
import { IPost } from "../../services/post";
import FeedModal from "./FeedModal";
import FeedPosts from "./FeedPosts";
import styles from "./styles.module.css";

const Feed = () => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  return (
    <>
      {selectedPost && (
        <FeedModal
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}
      <FeedPosts onPostClick={setSelectedPost} />
    </>
  );
};

export default Feed;
