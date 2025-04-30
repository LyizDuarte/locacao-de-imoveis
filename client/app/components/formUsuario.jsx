import { apiClient } from "@/utils/apiClient"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function FormUsuario() {
  const [listaPerfil, setListaPerfil] = useState([])

  useEffect(() => {
    listarPerfis()
  }, [])

  async function listarPerfis() {
    const perfis = await apiClient.get("/perfil")
    console.log(perfis)
    setListaPerfil(perfis)
  }
  return (
    <div>
      <div className="form-group">
        <label>Nome:</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label>E-mail:</label>
        <input type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label>Senha:</label>
        <input type="password" className="form-control" />
      </div>
      <div className="form-group">
        <label>Perfil:</label>
        <select className="form-control">
          <option value="0">-- Selecione --</option>
          {listaPerfil && listaPerfil.length > 0 ? (
            listaPerfil.map((value, index) => (
              <option key={index} value={value.id}>
                {value.descricao}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
      </div>
      <div className="form-group">
        <label>
          <input style={{ marginRight: "2px" }} type="checkbox" />
          Ativo
        </label>
      </div>
      <br />
      <br />
      <div>
        <button style={{ marginRight: "5px" }} className="btn btn-success">
          <i style={{ marginRight: "5px" }} className="fas fa-check"></i>Cadastrar
        </button>
        <Link className="btn btn-secondary" href="/admin/usuarios">
          <i style={{ marginRight: "5px" }} className="fa fa-arrow-left" aria-hidden="true"></i> Voltar
        </Link>
      </div>
    </div>
  )
}
