import Database from "../db/database.js"
import AluguelEntity from "../entities/aluguelEntity.js"
import ContratoEntity from "../entities/contratoEntity.js"
import ImovelEntity from "../entities/imovelEntity.js"
import UsuarioEntity from "../entities/usuarioEntity.js"

export default class AluguelRepository {
  #banco
  // para as transacoes
  set banco(value) {
    this.#banco = value
  }
  constructor() {
    this.#banco = new Database()
  }
  async obter(id) {
    let sql = "select * from tb_aluguel where alu_id = ?";
    const rows = await this.#banco.ExecutaComando(sql, [id]);
    if(rows.length > 0) {
        const row = rows[0];
        return new AluguelEntity(row["alu_id"], row["alu_mes"], row["alu_vencimento"], row["alu_valor"], row["alu_pago"]);
    }
    return null
}

  async gravar(aluguel) {
    let sql = `insert into tb_aluguel (alu_mes, alu_vencimento, alu_valor, alu_pago, ctr_id) 
                values (?, ?, ?, ?, ?)`
    let params = [aluguel.mes, aluguel.vencimento, aluguel.valor, aluguel.pago, aluguel.contrato.id]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }

  async marcarPagamento(id) {
    let sql = `update tb_aluguel set alu_pago = 'S' where alu_id = ?`
    let params = [id]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }

  async listar(usuId) {
    let sql = `select * from tb_aluguel a 
                    inner join tb_contrato c on a.ctr_id = c.ctr_id 
                    inner join tb_imovel i on i.imv_id = c.imv_id
                    where c.usu_id = ?`;
    let params = [usuId];
    let result = await this.#banco.ExecutaComando(sql, params);
    let lista = [];
    for(let row of result) {
        lista.push(
        new AluguelEntity(row["alu_id"], row["alu_mes"], row["alu_vencimento"], row["alu_valor"],row["alu_pago"], 
        new ContratoEntity(row["ctr_id"], 
        new ImovelEntity(row["imv_id"], row["imv_descricao"], row["imv_endereco"], row["imv_cep"], row["imv_bairro"], row["imv_cidade"]), 
        new UsuarioEntity(row["usu_id"]))))
    }
    return lista;
}

  async listarTodos(descricao, dataInicio, dataFim) {
    let sqlFiltro = ``

    if (descricao) {
      sqlFiltro += `where (u.usu_nome like '%${descricao}%' or i.imv_endereco like '%${descricao}%')`
    }
    if (dataInicio && dataFim) {
      if (sqlFiltro != "") {
        sqlFiltro += `and a.alu_vencimento >= '${dataInicio}' and a.alu_vencimento <= '${dataFim}'`
      } else {
        sqlFiltro += `where a.alu_vencimento >= '${dataInicio}' and a.alu_vencimento <= '${dataFim}'`
      }
    }

    let sql = `select * from tb_aluguel a inner join tb_contrato c on a.ctr_id = c.ctr_id
                inner join tb_usuario u on c.usu_id = u.usu_id 
                inner join tb_imovel i on i.imv_id = c.imv_id 
                ${sqlFiltro}
                order by alu_vencimento`
    let result = await this.#banco.ExecutaComando(sql)
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
            new ImovelEntity(row["imv_id"], "", "", row["imv_endereco"]),
            new UsuarioEntity(row["usu_id"], row["usu_nome"])
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
