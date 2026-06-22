const { Router } = require("express");
const autenticar = require("../middlewares/auth.middleware");
const {
  listarAlunos,
  listarMedias,
  listarAprovados,
  buscarAlunoPorId,
  criarAluno,
  atualizarAluno,
  removerAluno
} = require("../controllers");

const router = Router();

// Aplica o middleware de autenticação a todas as rotas abaixo
router.use(autenticar);


router.get("/", listarAlunos);
router.get("/medias", listarMedias);
router.get("/aprovados", listarAprovados);
// Rotas com parâmetro de ID devem vir após as rotas sem parâmetros para evitar conflitos
router.get("/:id", buscarAlunoPorId);
router.post("/", criarAluno);
router.put("/:id", atualizarAluno);
router.delete("/:id", removerAluno);

module.exports = router;
