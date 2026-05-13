import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import MovieSearchCard from "../components/MovieSearchCard";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import api from "../api";
import useMovieSearch from "../hooks/useMovieSearch";

function UpdateMovie() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [saving, setSaving] = useState(false);
  const {
    searchId,
    setSearchId,
    movie,
    setMovie,
    status,
    error,
    setError,
    searchMovie,
  } = useMovieSearch({ autoId: searchParams.get("id") });

  const handleSearch = async () => {
    await searchMovie();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.put(`/${movie.id}`, movie);
      navigate("/");
    } catch (err) {
      setError("Nao foi possivel alterar o filme.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page">
      <PageHeader
        title="Alterar Filme"
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

      {status === "found" && (
        <MovieForm
          value={movie}
          onChange={handleChange}
          onSubmit={handleUpdate}
          onCancel={() => navigate("/")}
          submitLabel="Alterar"
          isSubmitting={saving}
          error={error}
          showId
        />
      )}

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

export default UpdateMovie;
