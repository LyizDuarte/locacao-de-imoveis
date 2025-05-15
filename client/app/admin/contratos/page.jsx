"use client"

import { apiClient } from "@/utils/apiClient"
import { useEffect, useRef, useState } from "react"
import "../../../public/styles/contrato.css"
import toast from "react-hot-toast"

export default function ContratosPage() {
  const [listaContrato, setListaContrato] = useState([])
  const dataInicio = useRef("")
  const dataFim = useRef("")
  const descricao = useRef("")

  async function listar() {
    let queryString = ""
    if (descricao.value != "") {
      queryString += `?descricao=${descricao.current.value}`
    }
    if (dataFim.current.value != "" && dataInicio.current.value != "") {
      if (queryString != "") {
        queryString += `&dataInicio=${dataInicio.current.value}&dataFim=${dataFim.current.value}`
      } else {
        queryString += `?dataInicio=${dataInicio.current.value}&dataFim=${dataFim.current.value}`
      }
    } else if (dataFim.current.value != "" || dataInicio.current.value != "") {
      toast.error("Preencha a data de início e fim para fazer a filtragem!")
      return
    }

    let response = await apiClient.get(encodeURI("/aluguel" + queryString))
    if (response) {
      setListaContrato(response)
    } else {
      toast.error("Nenhum contrato encontrado!")
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
            <input ref={dataInicio} className="form-control" type="date" />
          </div>
          <div>
            <label htmlFor=""> Data de Fim</label>
            <input ref={dataFim} className="form-control" type="date" />
          </div>
          <div>
            <label htmlFor=""> Descrição</label>
            <input
              ref={descricao}
              placeholder="Nome do locatário ou Endereço do Imóvel"
              className="form-control"
              type="text"
            />
          </div>
          <div>
            <button onClick={listar} className="btn btn-primary">
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
