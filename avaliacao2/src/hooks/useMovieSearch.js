import { useCallback, useEffect, useState } from "react";
import api from "../api";

const emptyMovie = {
  id: "",
  nome: "",
  genero: "",
  ano: "",
};

function useMovieSearch({ autoId } = {}) {
  const [searchId, setSearchId] = useState(autoId || "");
  const [movie, setMovie] = useState(emptyMovie);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const searchMovie = useCallback(
    async (idValue = searchId) => {
      const normalizedId = idValue.trim();

      if (!normalizedId) {
        setError("Informe um id valido.");
        return;
      }

      setStatus("loading");
      setError("");

      try {
        const response = await api.get(`/${normalizedId}`);
        setMovie(response.data);
        setStatus("found");
      } catch (err) {
        setStatus("not-found");
      }
    },
    [searchId],
  );

  useEffect(() => {
    if (autoId) {
      setSearchId(autoId);
      searchMovie(autoId);
    }
  }, [autoId, searchMovie]);

  return {
    searchId,
    setSearchId,
    movie,
    setMovie,
    status,
    setStatus,
    error,
    setError,
    searchMovie,
  };
}

export default useMovieSearch;
