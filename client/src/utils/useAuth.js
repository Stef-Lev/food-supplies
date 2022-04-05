import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { fetchMethod } from "./fetchMethod";

export default function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const setUserContext = async () => {
    return await fetchMethod("get", "/api/auth/user")
      .then((res) => {
        setUser(res.currentUser);
        console.log("SETUSER CONTEXT", res);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError("ERR", err);
      });
  };

  const signupUser = async (data) => {
    const { username, fullname, password, passwordCheck } = data;

    return axios
      .post("/api/auth/signup", {
        username,
        fullname,
        password,
        passwordCheck,
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
    return axios
      .post("/api/auth/login", {
        username,
        password,
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
