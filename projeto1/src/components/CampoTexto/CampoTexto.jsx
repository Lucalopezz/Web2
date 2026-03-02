import "./CampoTexto.css";

export function CampoTexto(props) {
  return (
    <div className="campo-texto">
      <label>{props.label}</label>
      <input placeholder={props.placeholder} />
    </div>
  );
}
