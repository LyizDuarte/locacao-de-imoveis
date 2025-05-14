"use client"

import { apiClient } from "@/utils/apiClient"
import { useEffect, useState } from "react"
import "../../../public/styles/contrato.css"

export default function ContratosPage() {
  const [listaContrato, setListaContrato] = useState([])

  async function listar() {
    let response = await apiClient.get("/aluguel")
    if (response) {
      console.log(response)
      setListaContrato(response)
    }
  }

  useEffect(() => {
    listar()
  }, [])

  return (
    <div>
      <div>
        <h1>Contratos gerados</h1>
        <br />
        <br />
      </div>
      <div>
        <div className="contratos">
          <div>
            <label htmlFor=""> Data de Início</label>
            <input className="form-control" type="date" />
          </div>
          <div>
            <label htmlFor=""> Data de Fim</label>
            <input className="form-control" type="date" />
          </div>
          <div>
            <label htmlFor=""> Descrição</label>
            <input placeholder="Nome do locatário ou Endereço do Imóvel" className="form-control" type="text" />
          </div>
          <div>
            <button className="btn btn-primary">
              <i className="fas fa-search"></i>Buscar
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Locatário</th>
              <th>Imóvel</th>
              <th>Mês</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {listaContrato.map((value, index) => (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.contrato.usuario.nome}</td>
                <td>{value.contrato.imovel.endereco}</td>
                <td>{value.mes}</td>
                <td>{new Date(value.vencimento).toLocaleDateString()}</td>
                <td>R$ {value.valor}</td>
                <td>{value.pago == "S" ? "Pago" : "Pendente"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
