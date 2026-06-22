const { Router } = require("express");
const authRoutes = require("./auth.routes");
const alunosRoutes = require("./alunos.routes");

const router = Router();

router.use(authRoutes);
router.use("/alunos", alunosRoutes);

module.exports = router;
