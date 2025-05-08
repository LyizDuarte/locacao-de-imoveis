import Database from "../db/database.js"
import ImagemImovelEntity from "../entities/imagemImovelEntity.js"
import ImovelEntity from "../entities/imovelEntity.js"

export default class ImagemImovelRepository {
  #banco
  constructor() {
    this.#banco = new Database()
  }
  async gravar(entidade) {
    let sql = `insert into tb_imovelimagem (imv_id, imi_img)
                values (?, ?)`
    let params = [entidade.imovel.id, entidade.imagem]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
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

  async listarPorImovel(idImovel) {
    let sql = `select * from tb_imovelimagem where imv_id = ?`
    let params = [idImovel]
    let rows = await this.#banco.ExecutaComando(sql, params)
    let lista = []
    for (let row of rows) {
      lista.push(
        new ImagemImovelEntity(
          row["imi_id"],
          new ImovelEntity(row["imv_id"]),
          "data:image/jpeg;base64," + row["imi_img"].toString("base64")
        )
      )
    }
    return lista
  }
}
