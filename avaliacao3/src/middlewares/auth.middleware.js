import jsonwebtoken from "jsonwebtoken";

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
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.aluno = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
}
export default autenticar;
