function MovieDetails({ movie }) {
  if (!movie) {
    return null;
  }

  return (
    <div className="card">
      <div className="card__row">
        <span>ID</span>
        <strong>{movie.id}</strong>
      </div>
      <div className="card__row">
        <span>Nome</span>
        <strong>{movie.nome}</strong>
      </div>
      <div className="card__row">
        <span>Genero</span>
        <strong>{movie.genero}</strong>
      </div>
      <div className="card__row">
        <span>Ano</span>
        <strong>{movie.ano}</strong>
      </div>
    </div>
  );
}

export default MovieDetails;
