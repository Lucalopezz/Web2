import { CampoTexto } from "../CampoTexto/CampoTexto";
import "./Formulario.css";

export function Formulario() {
  return (
    <section className="formulario">
      <form>
        <h2>Dados do professor:</h2>
        <CampoTexto label="Nome" placeholder="Digite seu nome" />
        <CampoTexto label="Título" placeholder="Digite seu título" />
        <CampoTexto label="Imagem" placeholder="Digite o endereço da imagem" />
      </form>
    </section>
  );
}
