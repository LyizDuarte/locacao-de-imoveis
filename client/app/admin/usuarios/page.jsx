"use client"

import { apiClient } from "@/utils/apiClient"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function UsuariosPage() {
  const [lista, setLista] = useState([])

  useEffect(() => {
    listar()
  }, [])

  async function deletar(id) {
    toast((t) => (
      <div>
        <b>Tem certeza que deseja excluir o usuário?</b>
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <button style={{ marginRight: "5px" }} onClick={() => confirmaDelecao(id, t.id)} className="btn btn-danger">
            <i style={{ marginRight: "5px" }} class="fa fa-trash" aria-hidden="true"></i>
            Confirmar
          </button>
          <button onClick={() => toast.dismiss(t.id)} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </div>
    ))
  }

  async function confirmaDelecao(id, toastId) {
    toast.dismiss(toastId)
    try {
      await apiClient.delete("/usuarios/" + id)
      setLista(lista.filter((x) => x.id !== id))
      toast.success("Usuário excluído com sucesso!")
    } catch (error) {
      toast.error("Erro ao excluir o usuário.")
      console.error(error)
    }
  }

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
                  <Link
                    style={{ marginRight: "5px" }}
                    href={"/admin/usuarios/alterar/" + value.id}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-pen"></i>
                  </Link>
                  <button onClick={() => deletar(value.id)} className="btn btn-danger">
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
