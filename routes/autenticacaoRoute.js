import express from "express"
import AutenticacaoController from "../controllers/autenticacaoController.js"

const router = express.Router()
let ctrl = new AutenticacaoController()

router.post("/auth/token", (req, res) => {
  // #swagger.tags = ["Autenticação"]
  // swagger.summary = "Gera um token JWT para validação de acesso"
  ctrl.token(req, res)
})

export default router
