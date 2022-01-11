import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { IComment } from "../../../services/post";
import PostComment from "../PostComment";
import styles from "./styles.module.css";

interface IPostCommentsProps {
  id: number;
  comments: IComment[];
  isSingle?: boolean;
}

const PostComments = ({ id, comments, isSingle }: IPostCommentsProps) => {
  const [commentList, setCommentList] = useState(comments);
  const commentsSection = useRef<HTMLUListElement>(null);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [commentList]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${isSingle ? styles.single : ""}`}
      >
        {commentList.map((comment) => (
          <li key={comment.id}>
            <b>{comment.author}: </b>
            <span>{comment.content}</span>
          </li>
        ))}
      </ul>

      {isLoggedIn && (
        <PostComment
          id={id}
          isSingle={isSingle}
          onSubmitComment={setCommentList}
        />
      )}
    </>
  );
};

export default PostComments;
