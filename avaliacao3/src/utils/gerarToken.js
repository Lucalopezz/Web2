import jsonwebtoken from "jsonwebtoken";

function gerarToken(payload) {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}
export default gerarToken;
