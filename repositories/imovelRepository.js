import Database from "../db/database.js"
import ImovelEntity from "../entities/imovelEntity.js"

export default class ImovelRepository {
  #banco
  constructor() {
    this.#banco = new Database()
  }
  async listar() {
    let sql = "select * from tb_imovel"
    let rows = await this.#banco.ExecutaComando(sql)
    let lista = []
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]
      lista.push(
        new ImovelEntity(
          row["imv_id"],
          row["imv_descricao"],
          row["imv_cep"],
          row["imv_endereco"],
          row["imv_bairro"],
          row["imv_cidade"],
          row["imv_valor"],
          row["imv_disponivel"]
        )
      )
    }
    return lista
  }
  async obter(id) {
    let sql = "select * from tb_imovel where imv_id = ?"
    let valores = [id]
    let rows = await this.#banco.ExecutaComando(sql, valores)
    let lista = []
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]
      lista.push(
        new ImovelEntity(
          row["imv_id"],
          row["imv_descricao"],
          row["imv_cep"],
          row["imv_endereco"],
          row["imv_bairro"],
          row["imv_cidade"],
          row["imv_valor"],
          row["imv_disponivel"]
        )
      )
    }
    return lista
  }
  async cadastrar(entidade) {
    let sql = `insert into tb_imovel (imv_descricao, imv_cep, 
    imv_endereco, imv_bairro, imv_cidade, imv_valor, imv_disponivel)
    values (?, ?, ? ,?, ?, ?, ?)`
    let valores = [
      entidade.descricao,
      entidade.cep,
      entidade.endereco,
      entidade.bairro,
      entidade.cidade,
      entidade.valor,
      entidade.disponivel,
    ]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, valores)
    return result
  }
  async alterar(entidade) {
    let sql = `update tb_imovel set imv_descricao = ?, imv_cep = ?, imv_endereco = ?, 
    imv_bairro = ?, imv_cidade = ?, imv_valor = ?, imv_disponivel = ? where imv_id = ? 
    values (?, ?, ? ,?, ?, ?, ?, ?)`
    let valores = [
      entidade.descricao,
      entidade.cep,
      entidade.endereco,
      entidade.bairro,
      entidade.cidade,
      entidade.valor,
      entidade.disponivel,
      entidade.id,
    ]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, valores)
    return result
  }
  async deletar(id) {
    let sql = "delete from tb_imovel where imv_id = ?"
    let valores = [id]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, valores)
    return result
  }
}
