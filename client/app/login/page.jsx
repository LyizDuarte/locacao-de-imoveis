"use client"

import { apiClient } from "@/utils/apiClient"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import toast from "react-hot-toast"

export default function LoginPage() {
  const email = useRef("")
  const senha = useRef("")

  const router = useRouter()

  async function autenticar() {
    if (email.current.value != "" && senha.current.value) {
      let obj = {
        email: email.current.value,
        senha: senha.current.value,
      }
      let response = await apiClient.post("/auth/token", obj)
      if (response) {
        apiClient.setJwt(response.token)
        localStorage.setItem("jwt", response.token)
        router.push("/admin")
      }
    } else {
      toast.error("E-mail ou Senha inválidos!")
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Faça o login abaixo</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            ref={email}
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Insira o e-mail..."
                          />
                        </div>
                        <div className="form-group">
                          <input
                            ref={senha}
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Senha"
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label">Lembrar-me</label>
                          </div>
                        </div>
                        <button onClick={autenticar} type="button" className="btn btn-primary btn-user btn-block">
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
