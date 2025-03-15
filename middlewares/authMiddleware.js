import jwt from "jsonwebtoken"
import UsuarioRepository from "../repositories/usuarioRepository.js"

const SECRET = "C0R1NTH14N5"

export default class AuthMiddleware {
  gerarToken(id, nome, email, perfilId) {
    return jwt.sign(
      {
        id: id,
        nome: nome,
        email: email,
        perfilId: perfilId,
      },
      SECRET,
      { expiresIn: 360 }
    )
  }

  async validar(req, res, next) {
    if (req.headers.authorization == null)
      res.status(401).json({ msg: "Token de acesso não foi enviado" })

    let token = req.headers["authorization"].split(" ")[1]
    if (token) {
      let usuarioToken = jwt.verify(token, SECRET)
      let repo = new UsuarioRepository()
      let usuarioBanco = await repo.obter(usuarioToken.id)
      if (usuarioBanco.length > 0) {
        if (usuarioBanco[0].ativo) {
          next()
        } else {
          res.status(401).json({ msg: "Usuário inativo" })
        }
      } else {
        res.status(401).json({ msg: "Não autorizado!" })
      }
    } else {
      return res.status(401).json({ msg: "Não autorizado!" })
    }
  }
}
