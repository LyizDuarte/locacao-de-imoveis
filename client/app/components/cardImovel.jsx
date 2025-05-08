import { apiClient } from "@/utils/apiClient"
import Loading from "./loading"
import { useEffect, useState } from "react"

export default function CardImovel({ imovel }) {
  const [listaImagens, setListaImagens] = useState([])
  const [loading, setLoading] = useState(true)

  async function obterImagens() {
    let response = await apiClient.get("/imovel/imagens/" + imovel.id)
    if (response) {
      console.log(response)
      setListaImagens(response)
    }
    setLoading(false)
  }

  useEffect(() => {
    obterImagens()
  }, [])

  return (
    <div className="card" style={{ width: "200px" }}>
      {loading ? (
        <div style={{ marginTop: "20px" }}>
          <Loading />
        </div>
      ) : (
        <>
          {listaImagens && listaImagens.length > 0 ? (
            <img src={listaImagens[0].imagem} className="card-img-top" alt="Imagem do Imóvel" />
          ) : (
            <img src="/images/imovel-sem-foto.jpg" className="card-img-top" alt="Imagem do Imóvel" />
          )}
          <div className="card-body">
            <h5 className="card-title">R$ {imovel.valor}</h5>
            <p className="card-text">{imovel.descricao}</p>
            <p className="card-text">
              {imovel.endereco} - {imovel.bairro}
            </p>
            <p className="card-text">{imovel.cidade}</p>
          </div>
          <div className="card-footer">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn btn-primary" style={{ marginRight: "5px" }}>
                {" "}
                <i className="fas fa-pen"></i>
              </button>
              <button className="btn btn-danger">
                {" "}
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
