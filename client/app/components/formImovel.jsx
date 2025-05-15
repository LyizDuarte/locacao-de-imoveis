import Link from "next/link"

export default function FormImovel() {
  return (
    <div>
      <div className="form-group">
        <label>Descrição</label>
        <input type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>CEP</label>
        <input type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Endereço</label>
        <input type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Bairro</label>
        <input type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Cidade</label>
        <input type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Valor</label>
        <input type="text" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Disponível para locação</label>
        <input type="checkbox" style={{ marginLeft: "4px" }}></input>
      </div>
      <div className="form-group">
        <label>Imagens</label>
        <input className="form-control" type="file" multiple></input>
      </div>
      <br />
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
