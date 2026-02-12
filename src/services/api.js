const API_BASE = "http://localhost:3000";

export const login = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const result = await response.json();

    if (!response.ok) {
      return {
        errors: { error: result.message || "Login failed" },
      };
    }
    if (result.data?.token) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
    }
    return result;
  } catch (err) {
    console.error("Login error", err);
    return { errors: { error: "Network error. Please try again" } };
  }
};

export const getMe = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { error: "No token" };
  }

  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    return { error: result.message || "Token invalid" };
  }
  return result;
};

export const getTasks = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { error: "No token" };
  }

  const response = await fetch(`${API_BASE}/tasks`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    return { error: result.message || "Request failed" };
  }
  return result;
};
