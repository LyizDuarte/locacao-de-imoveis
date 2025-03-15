import AuthMiddleware from "../middlewares/authMiddleware.js"
import UsuarioRepository from "../repositories/usuarioRepository.js"

export default class AutenticacaoController {
  async token(req, res) {
    let { email, senha } = req.body
    if (email && senha) {
      let repo = new UsuarioRepository()
      let usuario = await repo.validarAcesso(email, senha)
      if (usuario) {
        let auth = new AuthMiddleware()
        let token = auth.gerarToken(
          usuario.id,
          usuario.nome,
          usuario.email,
          usuario.perfil.id
        )
        return res.status(200).json({ token: token })
      } else {
        return res.status(400).json({
          msg: "Email/Senha incorretos! Verifique se as credencias estão corretas",
        })
      }
    } else {
      return res.status(400).json({ msg: "Parâmetros Email/Senha incorretos!" })
    }
  }
}
