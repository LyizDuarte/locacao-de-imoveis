import express from "express"
import LocacaoController from "../controllers/locacaoController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router()

let ctrl = new LocacaoController()
let auth = new AuthMiddleware()
router.post("/locacao", auth.validar, (req, res) => {
  // #swagger.tags = ["Locação"]
  // #swagger.summary = "Realiza o processamento para alugar um imóvel"
  /* 
        #swagger.security = [{
            "bearerAuth": []
        }]
  */
  ctrl.processar(req, res)
})
export default router
