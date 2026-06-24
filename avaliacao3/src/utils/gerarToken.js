import jsonwebtoken from "jsonwebtoken";

export const JWT_SECRET = "chave_secreta_avaliacao3";

function gerarToken(payload) {
  return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export default gerarToken;
