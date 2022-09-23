import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import useShowIntro from "./useShowIntro";
import { UserContext } from "../context/UserContext";

export default function useLogout() {
  const navigate = useNavigate();
  const { setShowIntro } = useShowIntro();
  const { setUser } = useContext(UserContext);

  const logoutUser = async () => {
    try {
      await fetch("/api/auth/logout").then((res) => {
        setUser(null);
        setShowIntro(true);
        console.log("setShowIntro(true);");
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
