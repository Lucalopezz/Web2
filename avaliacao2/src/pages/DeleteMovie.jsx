import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionBar from "../components/ActionBar";
import MovieSearchCard from "../components/MovieSearchCard";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import api from "../api";
import useMovieSearch from "../hooks/useMovieSearch";

function DeleteMovie() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [deleting, setDeleting] = useState(false);
  const { searchId, setSearchId, movie, status, error, setError, searchMovie } =
    useMovieSearch({ autoId: searchParams.get("id") });

  const handleSearch = async () => {
    await searchMovie();
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");

    try {
      await api.delete(`/${movie.id}`);
      navigate("/");
    } catch (err) {
      setError("Nao foi possivel apagar o filme.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="page">
      <PageHeader
        title="Apagar Filme"
        subtitle="Informe o id e clique em procurar."
      />

      {status === "idle" || status === "loading" ? (
        <MovieSearchCard
          searchId={searchId}
          onSearchIdChange={(event) => setSearchId(event.target.value)}
          onSearch={handleSearch}
          onCancel={() => navigate("/")}
          isLoading={status === "loading"}
          error={error}
        />
      ) : null}

      {status === "found" && movie ? (
        <div className="card">
          <p>
            Tem certeza que deseja apagar <strong>{movie.nome}</strong>?
          </p>
          <StatusMessage variant="error">{error}</StatusMessage>
          <ActionBar>
            <button
              className="button button--danger"
              type="button"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Apagando..." : "Apagar"}
            </button>
            <button
              className="button button--ghost"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
          </ActionBar>
        </div>
      ) : null}

      {status === "not-found" && (
        <div className="card">
          <StatusMessage variant="error">Filme nao encontrado.</StatusMessage>
          <div className="actions">
            <button
              className="button button--ghost"
              type="button"
              onClick={() => navigate("/")}
            >
              Voltar para inicio
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default DeleteMovie;
