import ActionBar from "./ActionBar";
import StatusMessage from "./StatusMessage";

function MovieSearchCard({
  searchId,
  onSearchIdChange,
  onSearch,
  onCancel,
  isLoading,
  error,
  label = "ID do filme",
}) {
  return (
    <div className="card">
      <label className="form__field">
        <span>{label}</span>
        <input value={searchId} onChange={onSearchIdChange} />
      </label>
      <StatusMessage variant="error">{error}</StatusMessage>
      <ActionBar>
        <button
          className="button"
          type="button"
          onClick={onSearch}
          disabled={isLoading}
        >
          {isLoading ? "Procurando..." : "Procurar"}
        </button>
        <button
          className="button button--ghost"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </ActionBar>
    </div>
  );
}

export default MovieSearchCard;
