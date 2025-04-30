import Database from "../db/database.js"
import PerfilEntity from "../entities/perfilEntity.js"

export default class PerfilRepository {
  #banco

  constructor() {
    this.#banco = new Database()
  }

  async listar() {
    let sql = "select * from tb_perfil"
    let rows = await this.#banco.ExecutaComando(sql)
    let lista = []
    for (let row of rows) {
      lista.push(new PerfilEntity(row["per_id"], row["per_descricao"]))
    }
    return lista
  }
}
