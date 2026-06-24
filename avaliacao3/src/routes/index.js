import { Router } from "express";
import authRoutes from "./auth.routes.js";
import alunosRoutes from "./alunos.routes.js";

const router = Router();
router.use(authRoutes);
router.use("/alunos", alunosRoutes);
export default router;