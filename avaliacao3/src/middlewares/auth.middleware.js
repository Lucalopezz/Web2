const jwt = require("jsonwebtoken");

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
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.aluno = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
}

module.exports = autenticar;
