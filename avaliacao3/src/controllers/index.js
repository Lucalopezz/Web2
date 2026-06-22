const authController = require("./auth.controller");
const alunosController = require("./alunos.controller");

// Exporta todos os controladores em um único objeto para facilitar a importação
module.exports = {
  ...authController,
  ...alunosController,
};
