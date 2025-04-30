import express from "express"
import AuthMiddleware from "../middlewares/authMiddleware.js"
import PerfilController from "../controllers/perfilController.js"

const router = express.Router()
let authMiddleware = new AuthMiddleware()
let ctrl = new PerfilController()

router.get("/perfil", authMiddleware.validar, (req, res) => {
  //#swagger.tags = ['Perfil']
  //#swagger.summary = "Retorna todos os perfis cadastrados no banco de dados"
  /* 
        #swagger.security = [{
            "bearerAuth": []
        }]
  */
  ctrl.listar(req, res)
})

export default router
