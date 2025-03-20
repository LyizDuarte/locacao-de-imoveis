import Database from "../db/database.js"
import PerfilEntity from "../entities/perfilEntity.js"
import UsuarioEntity from "../entities/usuarioEntity.js"

export default class UsuarioRepository {
  #banco
  // para as transacoes
  set banco(value) {
    this.#banco = value
  }
  constructor() {
    this.#banco = new Database()
  }
  async listar() {
    let sql =
      "select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id"
    let rows = await this.#banco.ExecutaComando(sql)
    let lista = []
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]
      lista.push(
        new UsuarioEntity(
          row["usu_id"],
          row["usu_nome"],
          row["usu_email"],
          row["usu_ativo"],
          row["usu_senha"],
          new PerfilEntity(row["per_id"], row["per_descricao"])
        )
      )
    }
    return lista
  }
  async cadastrar(entidade) {
    let sql =
      "insert into tb_usuario (usu_nome, usu_email, usu_ativo, usu_senha, per_id) values (?,?,?,?,?)"
    let params = [
      entidade.nome,
      entidade.email,
      entidade.ativo,
      entidade.senha,
      entidade.perfil.id,
    ]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }
  async obter(codigo) {
    let sql =
      "select * from tb_usuario u inner join tb_perfil p on u.per_id = p.per_id where u.usu_id = ?"
    let params = [codigo]
    let rows = await this.#banco.ExecutaComando(sql, params)
    let lista = []
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]
      lista.push(
        new UsuarioEntity(
          row["usu_id"],
          row["usu_nome"],
          row["usu_email"],
          row["usu_ativo"],
          row["usu_senha"],
          new PerfilEntity(row["per_id"], row["per_descricao"])
        )
      )
    }
    return lista
  }
  async excluir(codigo) {
    let sql = "delete from tb_usuario where usu_id = ?"
    let params = [codigo]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }
  async alterar(entidade) {
    let sql = `update tb_usuario set usu_nome = ?,
                                     usu_email = ?, 
                                     usu_ativo = ?,
                                     usu_senha = ?, 
                                     per_id = ?
                where usu_id = ?`
    let params = [
      entidade.nome,
      entidade.email,
      entidade.ativo,
      entidade.senha,
      entidade.perfil.id,
      entidade.id,
    ]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }
  async validarAcesso(email, senha) {
    let sql = `select * from tb_usuario where usu_email = ? and usu_senha = ? and usu_ativo = 1`
    let params = [email, senha]
    let result = await this.#banco.ExecutaComando(sql, params)
    if (result.length > 0) {
      let row = result[0]
      return new UsuarioEntity(
        row["usu_id"],
        row["usu_nome"],
        row["usu_email"],
        row["usu_ativo"],
        row["usu_senha"],
        new PerfilEntity(row["per_id"])
      )
    }
    return null
  }
}
