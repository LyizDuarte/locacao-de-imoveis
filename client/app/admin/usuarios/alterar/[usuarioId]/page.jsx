"use client"

import FormUsuario from "@/app/components/formUsuario"
import { useEffect } from "react"

export default function AlterarUsuario({ params: { usuarioId } }) {
  useEffect(() => {
    console.log("Alterando o usuario: " + usuarioId)
  }, [])

  return (
    <div>
      <h1>Alterar Usuário</h1>
      <div>
        <FormUsuario usuarioAlteracao={usuarioId}></FormUsuario>
      </div>
    </div>
  )
}
