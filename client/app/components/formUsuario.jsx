import { apiClient } from "@/utils/apiClient"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"
import Loading from "./loading"

export default function FormUsuario({ usuarioAlteracao }) {
  const [listaPerfil, setListaPerfil] = useState([])
  const [alteracao, setAlteracao] = useState(false)
  const [carregando, setCarregando] = useState(true)

  const nome = useRef("")
  const email = useRef("")
  const senha = useRef("")
  const perfil = useRef("")
  const ativo = useRef("")

  async function obter() {
    const response = await apiClient.get("/usuarios/" + usuarioAlteracao)
    if (response && response.length > 0) {
      let usuario = response[0]
      nome.current.value = usuario.nome
      email.current.value = usuario.email
      senha.current.value = usuario.senha
      perfil.current.value = usuario.perfil.id
      ativo.current.checked = usuario.ativo == 1 ? true : false
    }
  }

  async function alterar() {
    if (
      nome.current.value != "" &&
      email.current.value != "" &&
      senha.current.value != "" &&
      perfil.current.value != 0
    ) {
      let obj = {
        id: usuarioAlteracao,
        nome: nome.current.value,
        email: email.current.value,
        senha: senha.current.value,
        perfil: { id: perfil.current.value },
      }
      const response = await apiClient.put("/usuarios", obj)
      if (response) {
        toast.success("Usuário alterado com sucesso!")
      }
    } else {
      toast.error("Preencha corretamente os campos do formulário!")
    }
  }

  async function cadastrar() {
    if (
      nome.current.value != "" &&
      email.current.value != "" &&
      senha.current.value != "" &&
      perfil.current.value != 0
    ) {
      //objeto a ser enviado via post
      const obj = {
        nome: nome.current.value,
        email: email.current.value,
        ativo: ativo.current.checked ? 1 : 0,
        senha: senha.current.value,
        perfil: {
          id: perfil.current.value,
        },
      }

      toast.promise(apiClient.post("/usuarios", obj), {
        loading: "Cadastrando",
        success: <b>Usuário cadastrado!</b>,
        error: <b>Erro ao cadastrar usuário!</b>,
      })
    } else {
      toast.error("Preencha corretamente os campos do formulário")
    }
  }

  useEffect(() => {
    let p = listarPerfis()
    Promise.all([p])
      .then((results) => {
        console.log(results[0])
        setListaPerfil(results[0])
        if (usuarioAlteracao) {
          obter()
          setAlteracao(true)
        }
      })
      .finally(() => {
        setCarregando(false)
      })
    //componente entra em modo de alteracao
  }, [])

  function listarPerfis() {
    return apiClient.get("/perfil")
  }
  return carregando == true ? (
    <Loading></Loading>
  ) : (
    <div>
      <div className="form-group">
        <label>Nome:</label>
        <input ref={nome} type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label>E-mail:</label>
        <input ref={email} type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label>Senha:</label>
        <input ref={senha} type="password" className="form-control" />
      </div>
      <div className="form-group">
        <label>Perfil:</label>
        <select ref={perfil} className="form-control">
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
          <input ref={ativo} style={{ marginRight: "2px" }} type="checkbox" />
          Ativo
        </label>
      </div>
      <br />
      <br />
      <div>
        <button onClick={alteracao ? alterar : cadastrar} style={{ marginRight: "5px" }} className="btn btn-success">
          <i style={{ marginRight: "5px" }} className="fas fa-check"></i>
          {alteracao == true ? "Alterar" : "Cadastrar"}
        </button>
        <Link className="btn btn-secondary" href="/admin/usuarios">
          <i style={{ marginRight: "5px" }} className="fa fa-arrow-left" aria-hidden="true"></i> Voltar
        </Link>
      </div>
    </div>
  )
}
