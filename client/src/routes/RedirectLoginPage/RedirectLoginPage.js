import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import { UserContext } from "../../context/UserContext";

export default function RedirectLoggedInPage({ children }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <AnimatedLoader />;
  }
  return user ? <Navigate to="/" /> : children;
}
