import Database from "../db/database.js"
import AluguelEntity from "../entities/aluguelEntity.js"
import ContratoEntity from "../entities/contratoEntity.js"
import ImovelEntity from "../entities/imovelEntity.js"
import UsuarioEntity from "../entities/usuarioEntity.js"

export default class AluguelRepository {
  #banco
  constructor() {
    this.#banco = new Database()
  }
  async gravar(aluguel) {
    let sql = `insert into tb_aluguel (alu_mes, alu_vencimento, alu_valor, alu_pago, ctr_id) 
                values (?, ?, ?, ?, ?)`
    let params = [
      aluguel.mes,
      aluguel.vencimento,
      aluguel.valor,
      aluguel.pago,
      aluguel.contrato.id,
    ]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }

  async marcarPagamento(id) {
    let sql = `update tb_aluguel set alu_pago = 'S' where alu_id = ?`
    let params = [id]
    let result = this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }

  async listar(usuId) {
    let sql = `select * from tb_aluguel a inner join tb_contrato c 
                on a.ctr_id = c.ctr_id where c.usu_id = ?`
    let params = [usuId]
    let result = this.#banco.ExecutaComando(sql, params)
    let lista = []
    for (let row of result) {
      lista.push(
        new AluguelEntity(
          row["alu_id"],
          row["alu_mes"],
          row["alu_vencimento"],
          row["alu_valor"],
          row["alu_pago"],
          new ContratoEntity(
            row["ctr_id"],
            new ImovelEntity(row["imv_id"]),
            new UsuarioEntity(row["usu_id"])
          )
        )
      )
    }
    return lista
  }

  async marcarComoIndisponivel(id) {
    let sql = `update tb_imovel set imv_disponivel = 'N' where imv_id = ?`
    let params = [id]
    return await this.#banco.ExecutaComandoNonQuery(sql, params)
  }
}
