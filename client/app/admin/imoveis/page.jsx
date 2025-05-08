"use client"

import CardImovel from "@/app/components/cardImovel"
import { apiClient } from "@/utils/apiClient"
import { useEffect, useState } from "react"
import "../../../public/styles/card-imovel.css"
import Link from "next/link"

export default function ImoveisPage() {
  const [lista, setLista] = useState([])

  async function listar() {
    const response = await apiClient.get("/imovel")
    if (response) {
      console.log(response)
      setLista(response)
    }
  }

  useEffect(() => {
    listar()
  }, [])

  return (
    <div>
      <h1>Imóveis Cadastrados</h1>
      <br />
      <Link href="#" className="btn btn-primary">
        <i className="fas fa-plus"></i>Cadastrar imóvel
      </Link>
      <br />
      <br />
      <div className="grid-imovel">
        {lista.map((value, index) => (
          <CardImovel key={value.id} imovel={value}></CardImovel>
        ))}
      </div>
    </div>
  )
}
