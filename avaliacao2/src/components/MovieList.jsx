import { Link } from "react-router-dom";

function MovieList({ movies }) {
  if (!movies.length) {
    return <p className="status">Nenhum filme cadastrado.</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-list__item">
          <Link className="movie-list__link" to={`/filmes/${movie.id}`}>
            <span className="movie-list__id">#{movie.id}</span>
            <span className="movie-list__name">{movie.nome}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
