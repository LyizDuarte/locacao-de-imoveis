"use client"

import { apiClient } from "@/utils/apiClient"
import { useEffect } from "react"

export default function UsuariosPage() {
  useEffect(() => {
    listar()
  }, [])

  async function listar() {
    let resposta = await apiClient.get("/usuarios")
    console.log(resposta)
  }

  return (
    <div>
      <h1>Página de Usuários</h1>
    </div>
  )
}
