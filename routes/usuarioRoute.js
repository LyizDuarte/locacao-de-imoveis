import express from "express"
import UsuarioController from "../controllers/usuarioController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router()

let ctrl = new UsuarioController()
let authMiddleware = new AuthMiddleware()

router.get("/usuarios", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  // #swagger.tags = ['Usuários']
  // #swagger.summary = "Endpoint para listar todos os usuários"
  ctrl.listar(req, res)
})

router.post("/usuarios", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  // #swagger.tags = ['Usuários']
  // #swagger.summary = "Endpoint para cadastrar um novo usuário"
  /* #swagger.requestBody = {
        required: true,
        content:{
            "application/json":{
                schema:{
                    $ref: "#/components/schemas/usuario"
                }
            }
        }
   } 
  */
  ctrl.cadastrar(req, res)
})

router.get("/usuarios/:codigo", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  // #swagger.tags = ['Usuários']
  // #swagger.summary = "Endpoint para listar um usuário específico através de seu id"
  ctrl.obter(req, res)
})

router.delete("/usuarios/:codigo", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  // #swagger.tags = ['Usuários']
  // #swagger.summary = "Endpoint para deletar um usuário específico através de seu id"
  ctrl.excluir(req, res)
})

router.put("/usuarios", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  // #swagger.tags = ['Usuários']
  // #swagger.summary = "Endpoint para alterar um usuário específico através de seu id e informações enviadas"
  /* #swagger.requestBody = {
        required: true,
        content:{
            "application/json":{
                schema:{
                    $ref: "#/components/schemas/usuario"
                }
            }
        }
   } 
  */
  ctrl.alterar(req, res)
})

export default router
