import { useState } from "react";
import { IPublication } from "../../services/publication";
import FeedModal from "./FeedModal";
import FeedPublications from "./FeedPublications";
import styles from "./styles.module.css";

const Feed = () => {
  const [selectedPublication, setSelectedPublication] =
    useState<IPublication | null>(null);

  return (
    <>
      {selectedPublication && (
        <FeedModal
          selectedPublication={selectedPublication}
          setSelectedPublication={setSelectedPublication}
        />
      )}
      <FeedPublications onPublicationClick={setSelectedPublication} />
    </>
  );
};

export default Feed;
