"use client"

import { apiClient } from "@/utils/apiClient"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  
  const router = useRouter()

  async function gravar() {
    if (
      descricao.current.value != "" &&
      cep.current.value != "" &&
      endereco.current.value != "" &&
      bairro.current.value != "" &&
      cidade.current.value != "" &&
      valor.current.value != "" &&
      valor.current.value > 0
    ) {
      let arrEndereco = endereco.current.value.split(",")
      if (arrEndereco.length > 0) {
        let numero = arrEndereco[1]
        if (isNaN(numero) == true) {
          toast.error("Preencha o número do endereço!")
          return
        }
      } else {
        toast.error("Preencha o endereço no formato: Rua das Alamedas, 0")
        return
      }

      let form = new FormData()
      form.append("descricao", descricao.current.value)
      form.append("cep", cep.current.value)
      form.append("endereco", endereco.current.value)
      form.append("bairro", bairro.current.value)
      form.append("cidade", cidade.current.value)
      form.append("valor", valor.current.value)
      form.append("disponivel", disponivel.current.checked == true ? "S" : "N")
      for (let file of imagens.current.files) form.append("imagens", file)

      let response = await apiClient.postFormData("/imovel", form)
      if (response) {
        toast.success("Imóvel gravado com sucesso!")
        router.replace("/admin/imoveis")
      }
    } else {
      toast.error("Preencha todos os campos antes de gravar!")
    }
  }

  function carregarImagens() {
    if (imagens.current.files.length > 0) {
      if (imagens.current.files.length > 5) {
        toast.error("Cadastre no máximo 5 imagens!")
        return
      }
      let listaAux = []
      for (let file of imagens.current.files) {
        listaAux.push(URL.createObjectURL(file))
      }
      setListaImagens(listaAux)
    }
  }

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
        <input onChange={carregarImagens} ref={imagens} className="form-control" type="file" multiple></input>
      </div>
      <br />
      <div style={{ display: "flex"}}>
        {listaImagens != null && listaImagens.length > 0 ? (
          listaImagens.map((value, index) => {
            return (
              <div style={{ marginRight: "15px" }} key={index}>
                <img src={value} width="150" />
              </div>
            )
          })
        ) : (
          <></>
        )}
      </div>
      <br />
      <br />
      <div>
        <button onClick={gravar} style={{ marginRight: "5px" }} className="btn btn-success">
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
