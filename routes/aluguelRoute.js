import express from "express"
import AluguelController from "../controllers/aluguelController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

let ctrl = new AluguelController()
let auth = new AuthMiddleware()

router.get("/aluguel", auth.validar, (req, res) => {
  // #swagger.tags = ["Aluguel"]
  // #swagger.summary = "Retorna todos os aluguéis do usuário"
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  ctrl.listar(req, res)
})

router.patch("/aluguel/pagar", auth.validar, (req, res) => {
  // #swagger.tags = ["Aluguel"]
  // #swagger.summary = "Confirma o pagamento do aluguel no banco de dados"
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  ctrl.marcarComoPago(req, res)
})

export default router
