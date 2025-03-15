import BaseEntity from "./baseEntity.js"

export default class PerfilEntity extends BaseEntity {
  #id
  #descricao

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

  constructor(id, descricao) {
    super()
    this.#id = id
    this.#descricao = descricao
  }
}
