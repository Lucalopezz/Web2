const alunos = require("../data/alunos");
const gerarToken = require("../utils/gerarToken");

function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username e password sao obrigatorios!" });
  }

  const alunoExistente = alunos.find((aluno) => aluno.username === username);

  if (alunoExistente) {
    return res.status(400).json({ message: "Aluno ja cadastrado!" });
  }

  alunos.push({ username, password });

  return res.status(201).json({ message: "Aluno criado!" });
}

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username e password sao obrigatorios!" });
  }

  const aluno = alunos.find(
    (alunoCadastrado) =>
      alunoCadastrado.username === username &&
      alunoCadastrado.password === password,
  );

  if (!aluno) {
    return res.status(401).json({ message: "Aluno ou senha invalidos!" });
  }

  const token = gerarToken({ username: aluno.username });

  return res.json({ token });
}

module.exports = {
  register,
  login,
};
