const alunos = require("../data/alunos");

function validarId(id) {}

function calcularMedia(aluno) {}

function listarAlunos(req, res) {}

function listarMedias(req, res) {}

function listarAprovados(req, res) {}

function buscarAlunoPorId(req, res) {}

function criarAluno(req, res) {}

function atualizarAluno(req, res) {}

function removerAluno(req, res) {}

// Exporta todas as funções do controlador para serem usadas nas rotas
// Não exporta funções auxiliares como validarId e calcularMedia, pois são internas ao controlador
module.exports = {
  listarAlunos,
  listarMedias,
  listarAprovados,
  buscarAlunoPorId,
  criarAluno,
  atualizarAluno,
  removerAluno,
};
