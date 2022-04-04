import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const setUserContext = async () => {
    return await fetch("/api/auth/user")
      .then((res) => {
        setUser(res.data.currentUser);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data);
      });
  };

  const signupUser = async (data) => {
    const { username, fullname, password, passwordCheck } = data;

    return fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        fullname,
        password,
        passwordCheck,
      }),
    })
      .then(async () => {
        await setUserContext();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data);
      });
  };

  //login
  const loginUser = async (data) => {
    const { username, password } = data;
    return fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(async () => {
        await setUserContext();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const clearError = () => {
    setError(null);
  };

  return {
    signupUser,
    loginUser,
    clearError,
    error,
  };
}
