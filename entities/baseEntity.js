export default class BaseEntity {
  constructor() {}
  toJSON() {
    let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
    let json = {}
    for (let prop of props) {
      if (this[prop] && typeof this[prop] != "function") {
        json[prop] = this[prop]
      }
    }
    return json
  }
}
