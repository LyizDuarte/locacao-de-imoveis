import BaseEntity from "./baseEntity.js"

export default class UsuarioEntity extends BaseEntity{
  #id
  #nome
  #email
  #ativo
  #senha
  #perfil

  get id() {
    return this.#id
  }
  set id(value) {
    this.#id = value
  }
  get nome() {
    return this.#nome
  }
  set nome(value) {
    this.#nome = value
  }
  get email() {
    return this.#email
  }
  set email(value) {
    this.#email = value
  }
  get ativo() {
    return this.#ativo
  }
  set ativo(value) {
    this.#ativo = value
  }
  get senha() {
    return this.#senha
  }
  set senha(value) {
    this.#senha = value
  }
  get perfil() {
    return this.#perfil
  }
  set perfil(value) {
    this.#perfil = value
  }

  constructor(id, nome, email, ativo, senha, perfil) {
    super()
    this.#id = id
    this.#nome = nome
    this.#email = email
    this.#ativo = ativo
    this.#senha = senha
    this.#perfil = perfil
  }
}
