"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import toast from "react-hot-toast"

export default function FormImovel() {
  const descricao = useRef("")
  const cep = useRef("")
  const endereco = useRef("")
  const bairro = useRef("")
  const cidade = useRef("")
  const valor = useRef("")
  const disponivel = useRef("")
  const imagens = useRef("")
  const [listaImagens, setListaImagens] = useState([])

  async function consultarCep() {
    if (cep.current.value != "") {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep.current.value}/json/`)
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`)
        }
        const body = await response.json()
        if (!body.erro) {
          toast.success("CEP Encontrado!")
          endereco.current.value = body.logradouro
          bairro.current.value = body.bairro
          cidade.current.value = body.localidade
        } else {
          toast.error("CEP não encontrado!")
        }
      } catch (error) {
        toast.error(`Erro ao buscar CEP: ${error.message}`)
      }
    }
  }

  return (
    <div>
      <div className="form-group">
        <label>Descrição</label>
        <input ref={descricao} type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>CEP</label>
        <input onBlur={consultarCep} ref={cep} type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Endereço</label>
        <input ref={endereco} type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Bairro</label>
        <input ref={bairro} type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Cidade</label>
        <input ref={cidade} type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Valor</label>
        <input ref={valor} type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Disponível para locação</label>
        <input ref={disponivel} type="checkbox" style={{ marginLeft: "4px" }}></input>
      </div>
      <div className="form-group">
        <label>Imagens</label>
        <input ref={imagens} className="form-control" type="file" multiple></input>
      </div>
      <br />
      <div>
        {listaImagens != null && listaImagens.length > 0 ? (
          listaImagens.map((value, index) => {
            return (
              <div key={index}>
                <img src={value} width="150" />
              </div>
            )
          })
        ) : (
          <></>
        )}
      </div>
      <div>
        <button style={{ marginRight: "5px" }} className="btn btn-success">
          <i className="fas fa-check"></i> Cadastrar
        </button>
        <Link href="/admin/imoveis" className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i>
          Voltar
        </Link>
      </div>
    </div>
  )
}
