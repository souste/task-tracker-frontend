import { useState, useEffect } from "react";
import { getTask } from "../../services/api";
import { useParams } from "react-router-dom";

function SingleTask() {
  const [task, setTask] = useState({});
  const [taskLoading, setTaskLoading] = useState(true);
  const [error, setError] = useState("");
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setTaskLoading(true);
        setError("");

        const result = await getTask(taskId);

        if (result.error) {
          setError(result.error);
          setTask({});
        } else {
          setTask(result.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch task", err);
        setError("Failed to fetch task");
      } finally {
        setTaskLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  if (taskLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>{new Date(task.created_at).toLocaleString()}</p>
        <button>Edit</button>
        <button>Delete</button>
        <p>Comments</p>
      </div>
    </>
  );
}

export default SingleTask;
