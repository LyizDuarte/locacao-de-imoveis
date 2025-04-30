import PerfilRepository from "../repositories/perfilRepository.js"

export default class PerfilController {
  #perfilRepo
  constructor() {
    this.#perfilRepo = new PerfilRepository()
  }

  async listar(req, res) {
    let lista = await this.#perfilRepo.listar()
    if (lista.length == 0) {
      return res.status(404).json({ msg: "Não há perfis cadastrados!" })
    }
    return res.status(200).json(lista)
  }
}
