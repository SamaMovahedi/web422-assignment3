import jwt from "jsonwebtoken";

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const readToken = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  return jwt.decode(token);
};

const isAuthenticated = () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  return true;
};

export const authenticateUser = async (user, password) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user,
        password: password,
      }),
    }
  );

  if (res.status === 200) {
    const data = await res.json();
    setToken(data.token);
    return true;
  }

  return false;
};

export const registerUser = async (user, password, password2) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user,
        password: password,
        password2: password2,
      }),
    }
  );

  if (res.status === 200) {
    return true;
  }

  return false;
};

export {
  setToken,
  getToken,
  removeToken,
  readToken,
  isAuthenticated,
};