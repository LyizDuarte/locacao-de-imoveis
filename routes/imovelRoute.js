import express from "express"
import ImovelController from "../controllers/imovelController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"
import Multer from "multer"
const router = express.Router()
const upload = Multer()
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
router.post("/imovel", authMiddleware.validar, upload.array("imagens", 5), (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //#swagger.tags = ["Imóvel"]
  //#swagger.summary = "Cadastra um novo imóvel"

  /* #swagger.requestBody = {
        required: true,
        content:{
            "multipart/form-data":{
                schema:{
                    $ref: "#/components/schemas/imovel"
                }
            }
        }
   } 
  */
  ctrl.cadastrar(req, res)
})
router.put("/imovel", authMiddleware.validar, upload.array("imagens", 5), (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //#swagger.tags = ["Imóvel"]
  //#swagger.summary = "Altera um imóvel existente através do id"
  /* #swagger.requestBody = {
        required: true,
        content:{
            "multipart/form-data":{
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

router.get("/imovel/imagens/:id", authMiddleware.validar, (req, res) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //#swagger.tags = ["Imóvel"]
  //#swagger.summary = "Lista as imagens de um imóvel existente através do id"
  ctrl.imagens(req, res)
})

export default router
