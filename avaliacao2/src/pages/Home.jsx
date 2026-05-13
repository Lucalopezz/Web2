import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ActionBar from "../components/ActionBar";
import MovieList from "../components/MovieList";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      try {
        const response = await api.get("/");
        if (isMounted) {
          setMovies(response.data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError("Nao foi possivel carregar os filmes.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="page">
      <PageHeader
        title="Catalogo de Filmes"
        subtitle="Selecione um filme para ver os detalhes."
      />

      <ActionBar>
        <Link className="button" to="/filmes/novo">
          Criar filme
        </Link>
        <Link className="button button--ghost" to="/filmes/alterar">
          Alterar filme
        </Link>
        <Link className="button button--ghost" to="/filmes/apagar">
          Apagar filme
        </Link>
      </ActionBar>

      {loading && <StatusMessage>Carregando...</StatusMessage>}
      <StatusMessage variant="error">{error}</StatusMessage>

      {!loading && !error && <MovieList movies={movies} />}
    </section>
  );
}

export default Home;
