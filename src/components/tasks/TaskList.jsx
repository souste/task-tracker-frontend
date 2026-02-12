import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../../services/api";

function TaskList() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (authLoading || !user) return;
    const fetchTasks = async () => {
      try {
        setTasksLoading(true);
        setError("");

        const result = await getTasks();

        if (result.error) {
          setError(result.error);
          setTasks([]);
        } else {
          setTasks(result.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch tasks", err);
        setError("Failed to fetch tasks");
      } finally {
        setTasksLoading(false);
      }
    };
    fetchTasks();
  }, [authLoading, user]);

  if (tasksLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.status}</p>
          <p>{new Date(task.created_at).toLocaleString()}</p>
        </div>
      ))}
    </>
  );
}

export default TaskList;
