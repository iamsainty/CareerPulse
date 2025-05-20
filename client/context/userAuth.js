"use client";

const { createContext, useState, useEffect, useContext } = require("react");

const userAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const serverUrl = "http://localhost:3001";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${serverUrl}/user-auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data.message;
    } catch (error) {
      console.error("Signup error:", error);
      return error.message;
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await fetch(`${serverUrl}/user-auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data.message;
    } catch (error) {
      console.error("Signin error:", error);
      return error.message;
    }
  };

  const signout = async () => {
    try {
      const response = await fetch(`${serverUrl}/user-auth/signout`, {
        method: "POST",
      });
      const data = await response.json();
      localStorage.removeItem("token");
      return data.message;
    } catch (error) {
      console.error("Signout error:", error);
      return error.message;
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`${serverUrl}/user-auth/fetch-user`, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Fetch user error:", error);
      return error.message;
    }
  };

  return (
    <userAuthContext.Provider
      value={{ user, setUser, signup, signin, signout, fetchUser }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(userAuthContext);
