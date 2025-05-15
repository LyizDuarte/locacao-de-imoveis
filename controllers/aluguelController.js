import AluguelRepository from "../repositories/aluguelRepository.js"

export default class AluguelController {
  #repo

  constructor() {
    this.#repo = new AluguelRepository()
  }
  async listar(req, res) {
    let lista = await this.#repo.listar(req.usuarioLogado.id)
    if (lista.length == 0) {
      return res.status(404).json({ msg: "Nenhum aluguel encontrado" })
    } else {
      return res.status(200).json(lista)
    }
  }

  async listarTodos(req, res) {
    let { descricao, dataInicio, dataFim } = req.query

    let lista = await this.#repo.listarTodos(descricao, dataInicio, dataFim)
    if (lista.length == 0) {
      return res.status(404).json({ msg: "Nenhum aluguel encontrado" })
    } else {
      return res.status(200).json(lista)
    }
  }

  async marcarComoPago(req, res) {
    let { id } = req.body
    if (id) {
      let result = await this.#repo.marcarPagamento(id)
      if (result) return res.status(200).json({ msg: "Aluguel pago!" })
      else throw new Error("Erro ao confirmar pagamento da parcela!")
    } else {
      return res.status(404).json({ msg: "Parcela de aluguel não identificada" })
    }
  }
}
