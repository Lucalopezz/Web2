
import React from "react";
import "./Professor.css";
const Professor = (props) => {

    return (
        <div className="colaborador">

            <div className="cabecalho">
                <img src={props.imagem} alt={props.nome} />
            </div>
            <div className="rodape">
                <h4>{props.nome}</h4>
                <h5>{props.titulo}</h5>
            </div>

        </div>
    );
}
export default Professor;

