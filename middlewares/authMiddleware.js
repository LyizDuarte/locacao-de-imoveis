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
      { expiresIn: 3200 }
    )
  }

  async validar(req, res, next) {
    let that = this
    if (req.headers["authorization"] == null) return res.status(401).json({ msg: "Token de acesso não foi enviado!" })
    let token = req.headers["authorization"].split(" ")[1]
    if (token) {
      let usuarioToken = null
      let tokenValido = false
      try {
        usuarioToken = jwt.verify(token, SECRET)
        tokenValido = true
      } catch (ex) {
        if (ex.name == "TokenExpiredError") {
          usuarioToken = jwt.verify(token, SECRET, { ignoreExpiration: true })
          let auth = new AuthMiddleware()
          let novoToken = auth.gerarToken(usuarioToken.id, usuarioToken.nome, usuarioToken.email, usuarioToken.perfilId)
          res.set["authorization"] = `Bearer ${novoToken}`
          tokenValido = true
        } else res.status(401).json({ msg: "Não autorizado!" })
      }
      if (tokenValido) {
        //valida no banco;
        let repo = new UsuarioRepository()
        let usuarioBanco = await repo.obter(usuarioToken.id)
        if (usuarioBanco.length > 0) {
          if (usuarioBanco[0].ativo) {
            req.usuarioLogado = usuarioBanco[0]
            next()
          } else {
            res.status(401).json({ msg: "Usuário inativo" })
          }
        } else {
          res.status(401).json({ msg: "Não autorizado!" })
        }
      } else {
        res.status(401).json({ msg: "Não autorizado!" })
      }
    } else {
      res.status(401).json({ msg: "Não autorizado!" })
    }
  }
}
