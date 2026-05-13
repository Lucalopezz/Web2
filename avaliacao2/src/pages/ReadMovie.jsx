import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import ActionBar from "../components/ActionBar";
import MovieDetails from "../components/MovieDetails";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";

function ReadMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMovie = async () => {
      try {
        const response = await api.get(`/${id}`);
        if (isMounted) {
          setMovie(response.data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError("Filme nao encontrado.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMovie();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <section className="page">
      <PageHeader title="Detalhes do Filme" />

      {loading && <StatusMessage>Carregando...</StatusMessage>}
      <StatusMessage variant="error">{error}</StatusMessage>

      {!loading && !error && movie && (
        <>
          <MovieDetails movie={movie} />

          <ActionBar>
            <button
              type="button"
              className="button"
              onClick={() => navigate(`/filmes/alterar?id=${movie.id}`)}
            >
              Editar
            </button>
            <button
              type="button"
              className="button button--danger"
              onClick={() => navigate(`/filmes/apagar?id=${movie.id}`)}
            >
              Apagar
            </button>
          </ActionBar>
        </>
      )}

      <ActionBar>
        <button
          type="button"
          className="button button--ghost"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </ActionBar>
    </section>
  );
}

export default ReadMovie;
