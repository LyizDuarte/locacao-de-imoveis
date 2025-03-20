import ImovelRepository from "../repositories/imovelRepository.js"
import ContratoRepository from "../repositories/contratoRepository.js"
import AluguelRepository from "../repositories/aluguelRepository.js"
import ContratoEntity from "../entities/contratoEntity.js"
import ImovelEntity from "../entities/imovelEntity.js"
import UsuarioEntity from "../entities/usuarioEntity.js"
import AluguelEntity from "../entities/aluguelEntity.js"
import Database from "../db/database.js"
export default class LocacaoController {
  #imovelRepo
  #contratoRepo
  #aluguelRepo
  constructor() {
    this.#imovelRepo = new ImovelRepository()
    this.#contratoRepo = new ContratoRepository()
    this.#aluguelRepo = new AluguelRepository()
  }
  async processar(req, res) {
    let banco = new Database()
    try {
      await banco.AbreTransacao()
      this.#imovelRepo.banco = banco
      this.#contratoRepo.banco = banco
      this.#aluguelRepo.banco = banco
      let { idImovel } = req.body
      let imovel = (await this.#imovelRepo.obter(idImovel))[0]
      if (imovel && imovel.disponivel == "S") {
        // iniciar processo de locação
        let contrato = new ContratoEntity()
        contrato.imovel = new ImovelEntity(idImovel)
        contrato.usuario = new UsuarioEntity(req.usuarioLogado.id)
        if (await this.#contratoRepo.gravar(contrato)) {
          for (let i = 1; i <= 12; i++) {
            let aluguel = new AluguelEntity()
            aluguel.mes = i
            aluguel.valor = imovel.valor
            aluguel.pago = "N"
            let data = new Date()
            data.setMonth(data.getMonth() + i)
            aluguel.mes = data.getMonth() + 1
            aluguel.vencimento = data
            aluguel.contrato = contrato
            if ((await this.#aluguelRepo.gravar(aluguel)) == false) {
              throw new Error(`A parcela ${i} não foi inserida corretamente!`)
            }
          }
          imovel.disponivel = "N"
          if ((await this.#imovelRepo.alterar(imovel)) == true) {
            //commit pois está tudo certo
            await banco.Commit()
            return res.status(200).json({ msg: "Imóvel alugado com sucesso" })
          } else {
            throw new Error(`Erro ao marcar o imovel como indisponivel`)
          }
        } else {
          throw new Error("Erro ao gerar o contrato!")
        }
      } else {
        return res
          .status(400)
          .json({ msg: "Imóvel não disponivel para locação" })
      }
    } catch (ex) {
      await banco.Rollback()
      return res.status(500).json({ msg: "Erro interno do servidor" })
    }
    // realiza o rollback no banco de dados}
  }
}
