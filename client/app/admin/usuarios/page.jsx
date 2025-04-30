"use client"

import { apiClient } from "@/utils/apiClient"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function UsuariosPage() {
  const [lista, setLista] = useState([])

  useEffect(() => {
    listar()
  }, [])

  async function listar() {
    let resposta = await apiClient.get("/usuarios")
    setLista(resposta)
  }

  return (
    <div>
      <h1>Usuários cadastrados</h1>
      <div>
        <Link href="/admin/usuarios/cadastrar" className="btn btn-primary">
          <i style={{ marginRight: "7px" }} className="fas fa-plus"></i>Cadastrar Usuários
        </Link>
      </div>
      <br />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((value, index) => (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.nome}</td>
                <td>{value.email}</td>
                <td>{value.perfil.descricao}</td>
                <td>{value.ativo == 1 ? "Sim" : "Não"}</td>
                <td>
                  <Link style={{ marginRight: "5px" }} href="#" className="btn btn-primary">
                    <i className="fas fa-pen"></i>
                  </Link>
                  <button className="btn btn-danger">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
