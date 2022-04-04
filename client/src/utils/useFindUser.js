import { useState, useEffect } from "react";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function findUser() {
      await fetch("/api/auth/user")
        .then((res) => {
          setUser(res.data.currentUser);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
          setLoading(false);
        });
    }
    findUser();
  }, []);
  return {
    user,
    setUser,
    error,
    setError,
    isLoading,
  };
}