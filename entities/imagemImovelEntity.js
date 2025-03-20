import BaseEntity from "./baseEntity.js"

export default class ImagemImovelEntity extends BaseEntity {
  #id
  #imovel
  #imagem
  #extensao

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
  get imagem() {
    return this.#imagem
  }
  set imagem(value) {
    this.#imagem = value
  }
  get extensao() {
    return this.#extensao
  }
  set extensao(value) {
    this.#extensao = value
  }

  constructor(id, imovel, imagem, extensao) {
    super()
    this.#id = id
    this.#imovel = imovel
    this.#imagem = imagem
    this.#extensao = extensao
  }
  validar() {
    if (
      this.#extensao == "png" ||
      this.#extensao == "jpg" ||
      this.#extensao == "jpeg"
    ) {
      return true
    }
    return false
  }
}
