import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { UserContext } from "../../context/UserContext";

function PrivateRoutePage({ children }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loader />;
  }
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoutePage;
