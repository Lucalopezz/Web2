import ActionBar from "./ActionBar";
import StatusMessage from "./StatusMessage";

const fields = [
  { name: "nome", label: "Nome" },
  { name: "genero", label: "Genero" },
  { name: "ano", label: "Ano" },
];

function MovieForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
  isSubmitting,
  error,
  showId = false,
}) {
  return (
    <form className="form" onSubmit={onSubmit}>
      {showId ? (
        <label className="form__field">
          <span>ID</span>
          <input value={value.id} disabled />
        </label>
      ) : null}

      {fields.map((field) => (
        <label key={field.name} className="form__field">
          <span>{field.label}</span>
          <input
            name={field.name}
            value={value[field.name]}
            onChange={onChange}
            required
          />
        </label>
      ))}

      <StatusMessage variant="error">{error}</StatusMessage>

      <ActionBar>
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : submitLabel}
        </button>
        <button
          className="button button--ghost"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </ActionBar>
    </form>
  );
}

export default MovieForm;
