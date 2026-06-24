import usuarios from "../data/usuarios.js";
import gerarToken from "../utils/gerarToken.js";

export function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username e password sao obrigatorios!" });
  }

  const usuarioExistente = usuarios.find(
    (usuario) => usuario.username === username,
  );

  if (usuarioExistente) {
    return res.status(400).json({ message: "Usuario ja cadastrado!" });
  }

  usuarios.push({
    username,
    password,
  });

  return res.status(201).json({
    message: "Usuario criado!",
  });
}

export function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username e password sao obrigatorios!" });
  }

  const usuario = usuarios.find(
    (usuarioCadastrado) =>
      usuarioCadastrado.username === username &&
      usuarioCadastrado.password === password,
  );

  if (!usuario) {
    return res.status(401).json({
      message: "Usuario ou senha invalidos!",
    });
  }

  const token = gerarToken({
    username: usuario.username,
  });

  return res.json({
    message: `Login efetuado pelo usuario ${usuario.username}!`,
    token,
  });
}
