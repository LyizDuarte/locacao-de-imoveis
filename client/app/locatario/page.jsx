'use client'
import { apiClient } from "@/utils/apiClient";
import Link from "next/link";
import { useEffect, useState } from "react"


export default function Locatario() {
    const [listaAluguel, setListaAluguel] = useState([]);
    const [listaImoveis, setListaImoveis] = useState([])

    async function listar() {
        const response = await apiClient.get("/aluguel-usuario")
        if(response) {
            console.log(response);
            let listaImoveisAuxiliar = [];
            for(let i = 0; i < response.length;) {
               let idContrato = response[i].contrato.id;
               let listaAlugueis = response.filter(x=> x.contrato.id == idContrato);
               listaImoveisAuxiliar.push({
                    imovel: response[i].contrato.imovel,
                    idContrato: idContrato,
                    alugueis: listaAlugueis,
                    aberto: false,
               })

               i += listaAlugueis.length;
            }
            console.log(listaImoveisAuxiliar);
            setListaImoveis(listaImoveisAuxiliar);
        }
    }
    function toggle(idContrato) {
        let listaAtualizada = listaImoveis.map((value, index) => {
            if(value.idContrato == idContrato) {
                return {
                    ...value,
                    aberto: !value.aberto
                }
            }
            return value;
        })
        setListaImoveis(listaAtualizada);
    }

    useEffect(() => {
        listar();
    }, [])

    return (
        <div className="container py-4">
            <h1 className="mb-4">Minhas Locações</h1>
            
            <div className="accordion" id="accordionImovel">
                {
                    listaImoveis.map((value, index) => {
                        return <div key={index} className="card mb-3">
                                    <div className="card-header" id={`heading${index}`}>
                                        <h2 className="mb-0">
                                            <button onClick={() => toggle(value.idContrato)} className="btn btn-link btn-block text-left w-100 text-decoration-none" type="button">
                                                <i className="fas fa-home me-2"></i>
                                                Contrato {value.idContrato} - {value.imovel.endereco}
                                            </button>
                                        </h2>
                                    </div>
                    
                                    <div className={value.aberto == true ? "collapse show" : "collapse"} data-parent="#accordionImovel">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-striped table-hover">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Código</th>
                                                            <th>Ano</th>
                                                            <th>Mês</th>
                                                            <th>Vencimento</th>
                                                            <th>Valor</th>
                                                            <th>Situação</th>
                                                            <th>Ações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            value.alugueis.map((aluguel, aluguelIndex) => {
                                                                return <tr key={aluguelIndex}>
                                                                            <td>{aluguel.id}</td>                            
                                                                            <td>{new Date(aluguel.vencimento).getFullYear()}</td>
                                                                            <td>{aluguel.mes}</td>
                                                                            <td>{new Date(aluguel.vencimento).toLocaleDateString()}</td>
                                                                            <td>R$ {aluguel.valor}</td>
                                                                            <td>
                                                                                <span className={`badge ${aluguel.pago === "S" ? "bg-success" : "bg-warning"}`}>
                                                                                    {aluguel.pago === "S" ? "Pago" : "Pendente"}
                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    aluguel.pago == "N" ?
                                                                                    <Link href={"http://localhost:5000/aluguel/checkout/" + aluguel.id} className="btn btn-success btn-sm"><i className="fas fa-money-bill me-1"></i> Pagar</Link>
                                                                                    :
                                                                                    <></>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                                                                    
                                                </table>
                                            </div>
                
                                        </div>
                                    </div>
                                </div>
                    })
                }
            </div>
        </div>
    )
}