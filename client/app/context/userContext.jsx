"use client"

const { createContext, useState } = require("react")

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  var usuarioContexto = null
  if (typeof localStorage != "undefined") {
    var usuario = localStorage.getItem("usuario")
    if (usuario) {
      usuarioContexto = JSON.parse(usuario)
    }
  }
  const [user, setUser] = useState(usuarioContexto)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export default UserContext
