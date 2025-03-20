import Database from "../db/database.js"

export default class ImagemImovelRepository {
  #banco
  constructor() {
    this.#banco = new Database()
  }
  async gravar(entidade) {
    let sql = `insert into tb_imovelimagem (imv_id, imi_img)
                values (?, ?)`
    let params = [entidade.imovel.id, entidade.imagem]
    let result = this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }
  async deletar(id) {
    let sql = `delete from tb_imovelimagem where imi_id = ?`
    let params = [id]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }

  async deletarPorImovel(idImovel) {
    let sql = `delete from tb_imovelimagem where imv_id = ?`
    let params = [idImovel]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }
}
