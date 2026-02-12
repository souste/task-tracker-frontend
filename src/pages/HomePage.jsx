import { useAuth } from "../components/context/AuthContext";
import TaskList from "../components/tasks/TaskList";

function HomePage() {
  const { user, loading: authLoading, logout } = useAuth();

  if (authLoading) return <p>...Loading auth</p>;

  return (
    <div>
      {user ? (
        <div>
          <p>Logged in as: {user.email} </p>
          <button onClick={logout}>Logout</button>
          <TaskList />
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

export default HomePage;
