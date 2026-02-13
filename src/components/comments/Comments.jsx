import { useState, useEffect } from "react";
import { getComments } from "../../services/api";

function Comments({ taskId }) {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentsLoading(true);
        setError("");

        const result = await getComments(taskId);

        if (result.error) {
          setError(result.error);
          setComments([]);
        } else {
          setComments(result.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch task", err);
        setError("Failed to fetch task");
      } finally {
        setCommentsLoading(false);
      }
    };
    fetchComments();
  }, [taskId]);

  if (commentsLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <p>Comments: </p>
      {comments.map((comment) => (
        <div>
          <p>{comment.content}</p>
          <p>{new Date(comment.created_at).toLocaleString()}</p>
        </div>
      ))}
    </>
  );
}

export default Comments;
