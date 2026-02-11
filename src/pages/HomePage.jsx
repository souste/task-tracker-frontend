import { useAuth } from "../components/context/AuthContext";

function HomePage() {
  const { user, loading: authLoading, logout } = useAuth();

  if (authLoading) return <p>...Loading auth</p>;

  return (
    <div>
      <h1>HomePage Component</h1>
      {user ? (
        <div>
          <p>Logged in as: {user.email} </p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

export default HomePage;
