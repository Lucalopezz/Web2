import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../utils/gerarToken.js";

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado!" });
  }
  // O token deve estar no formato "Bearer <token>"
  const [tipo, token] = authHeader.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token inválido!" });
  }
  
  try {
    const payload = jsonwebtoken.verify(token, JWT_SECRET);
    req.usuario = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
}
export default autenticar;
