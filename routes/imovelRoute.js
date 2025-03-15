import express from "express"
import ImovelController from "../controllers/imovelController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router()
let ctrl = new ImovelController()
let authMiddleware = new AuthMiddleware()

router.get("/imovel", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //#swagger.tags = ["Imóvel"]
  //#swagger.summary = "Lista todos os imóveis cadastrados"
  ctrl.listar(req, res)
})
router.get("/imovel/:id", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //#swagger.tags = ["Imóvel"]
  //#swagger.summary = "Retorna um imóvel através do id informado"
  ctrl.obter(req, res)
})
router.post("/imovel", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //#swagger.tags = ["Imóvel"]
  //#swagger.summary = "Cadastra um novo imóvel"

  /* #swagger.requestBody = {
        required: true,
        content:{
            "application/json":{
                schema:{
                    $ref: "#/components/schemas/imovel"
                }
            }
        }
   } 
  */
  ctrl.cadastrar(req, res)
})
router.put("/imovel", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //#swagger.tags = ["Imóvel"]
  //#swagger.summary = "Altera um imóvel existente através do id"
  /* #swagger.requestBody = {
        required: true,
        content:{
            "application/json":{
                schema:{
                    $ref: "#/components/schemas/imovel"
                }
            }
        }
   } 
  */
  ctrl.alterar(req, res)
})
router.delete("/imovel/:id", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //#swagger.tags = ["Imóvel"]
  //#swagger.summary = "Exclui um imóvel existente através do id"
  ctrl.deletar(req, res)
})

export default router
