import ImovelEntity from "../entities/imovelEntity.js"
import ImovelRepository from "../repositories/imovelRepository.js"

export default class ImovelController {
  #repoImovel
  constructor() {
    this.#repoImovel = new ImovelRepository()
  }
  async listar(req, res) {
    var lista = await this.#repoImovel.listar()
    if (lista.length == 0)
      return res.status(404).json({ msg: "Nenhum imóvel encontrado!" })
    return res.status(200).json(lista)
  }
  async obter(req, res) {
    const { id } = req.params
    var lista = await this.#repoImovel.obter(id)
    if (lista.length == 0)
      return res.status(404).json({ msg: "Nenhum imóvel encontrado" })
    return res.status(200).json(lista)
  }
  async cadastrar(req, res) {
    const { descricao, cep, endereco, bairro, cidade, valor, disponivel } =
      req.body
    let imovel = new ImovelEntity(
      0,
      descricao,
      cep,
      endereco,
      bairro,
      cidade,
      valor,
      disponivel
    )
    if (imovel.validar()) {
      if (await this.#repoImovel.cadastrar(imovel)) {
        res.status(200).json({ msg: "Imovel cadastrado com sucesso!" })
      } else throw new Error("Erro ao inserir imóvel no banco de dados")
    } else {
      return res
        .status(400)
        .json({ msg: "Os dados do imóvel não foram preenchidos corretamente" })
    }
  }
  async alterar(req, res) {
    const { id, descricao, cep, endereco, bairro, cidade, valor, disponivel } =
      req.body
    let imovel = new ImovelEntity(
      id,
      descricao,
      cep,
      endereco,
      bairro,
      cidade,
      valor,
      disponivel
    )
    if (imovel.validar()) {
      if ((await this.#repoImovel.obter(id)).length > 0) {
        if (await this.#repoImovel.alterar(imovel)) {
          res.status(200).json({ msg: "Imovel alterado com sucesso!" })
        } else throw new Error("Erro ao alterar imóvel no banco de dados")
      }
    } else {
      return res
        .status(400)
        .json({ msg: "Os dados do imóvel não foram preenchidos corretamente" })
    }
  }
  async deletar(req, res) {
    const { id } = req.params
    let imovel = await this.#repoImovel.obter(id)
    if (imovel.length > 0) {
      if (await this.#repoImovel.deletar(id)) {
        res.status(200).json({ msg: "Imóvel excluido com sucesso!" })
      } else {
        throw new Error("Erro ao excluir imóvel do banco de dados")
      }
    } else {
      res.status(404).json({ msg: "Imóvel não encontrado para deleção" })
    }
  }
}
