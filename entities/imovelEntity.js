import BaseEntity from "./baseEntity.js"

export default class ImovelEntity extends BaseEntity {
  #id
  #descricao
  #cep
  #endereco
  #bairro
  #cidade
  #valor
  #disponivel
  #imagens

  get id() {
    return this.#id
  }
  set id(value) {
    this.#id = value
  }
  get descricao() {
    return this.#descricao
  }
  set descricao(value) {
    this.#descricao = value
  }
  get cep() {
    return this.#cep
  }
  set cep(value) {
    this.#cep = value
  }
  get endereco() {
    return this.#endereco
  }
  set endereco(value) {
    this.#endereco = value
  }
  get bairro() {
    return this.#bairro
  }
  set bairro(value) {
    this.#bairro = value
  }
  get cidade() {
    return this.#cidade
  }
  set cidade(value) {
    this.#cidade = value
  }
  get valor() {
    return this.#valor
  }
  set valor(value) {
    this.#valor = value
  }
  get disponivel() {
    return this.#disponivel
  }
  set disponivel(value) {
    this.#disponivel = value
  }
  get imagens() {
    return this.#imagens
  }
  set imagens(value) {
    this.#imagens = value
  }
  constructor(
    id,
    descricao,
    cep,
    endereco,
    bairro,
    cidade,
    valor,
    disponivel,
    imagens
  ) {
    super()
    this.#id = id
    this.#descricao = descricao
    this.#cep = cep
    this.#endereco = endereco
    this.#bairro = bairro
    this.#cidade = cidade
    this.#valor = valor
    this.#disponivel = disponivel
    this.#imagens = imagens
  }
  validar() {
    if (
      this.#descricao &&
      this.#cep &&
      this.#endereco &&
      this.#bairro &&
      this.#cidade &&
      this.#valor > 0
    ) {
      let arrEndereco = this.#endereco.split(",")[1]
      if (arrEndereco.length > 0) {
        let numero = arrEndereco[1]
        if (isNaN(numero) == false) return true
      }
    }
    return false
  }
  // toJSON() {
  //   return {
  //     id: this.#id,
  //     descricao: this.#descricao,
  //     cep: this.#cep,
  //     endereco: this.#endereco,
  //     bairro: this.#bairro,
  //     cidade: this.#cidade,
  //     valor: this.#valor,
  //     disponivel: this.#disponivel,
  //   }
  // }
}
