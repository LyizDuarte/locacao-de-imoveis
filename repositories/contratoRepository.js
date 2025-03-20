import Database from "../db/database.js"

export default class ContratoRepository {
  #banco
  // para as transacoes
  set banco(value) {
    this.#banco = value
  }

  constructor() {
    this.#banco = new Database()
  }
  async gravar(contrato) {
    let sql = `insert into tb_contrato (imv_id, usu_id) values (?, ?)`
    let params = [contrato.imovel.id, contrato.usuario.id]
    let result = await this.#banco.ExecutaComandoLastInserted(sql, params)

    if (result > 0) {
      contrato.id = result
      return true
    }
    return false
  }
}
