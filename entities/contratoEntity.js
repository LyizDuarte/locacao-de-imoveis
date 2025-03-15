import BaseEntity from "./baseEntity.js"

export default class ContratoEntity extends BaseEntity {
  #id
  #imovel
  #usuario

  get id() {
    return this.#id
  }
  set id(value) {
    this.#id = value
  }
  get imovel() {
    return this.#imovel
  }
  set imovel(value) {
    this.#imovel = value
  }
  get usuario() {
    return this.#usuario
  }
  set usuario(value) {
    this.#usuario = value
  }
  constructor(id, imovel, usuario) {
    super()
    this.#id = id
    this.#imovel = imovel
    this.#usuario = usuario
  }
}
