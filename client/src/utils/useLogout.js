import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logoutUser = async () => {
    try {
      await fetch("/api/auth/logout").then((res) => {
        setUser(null);
        navigate("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    logoutUser,
  };
}
