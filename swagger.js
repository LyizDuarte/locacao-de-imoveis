import swaggerAutogen from "swagger-autogen"
import ImovelEntity from "./entities/imovelEntity.js"
import UsuarioEntity from "./entities/usuarioEntity.js"
import PerfilEntity from "./entities/perfilEntity.js"
const doc = {
  host: "localhost:5000",
  info: {
    title: "API REST - PFS2",
    description:
      "API utilizando os padrões REST na disciplina de programação Full Stack 2",
  },
  components: {
    schemas: {
      imovel: new ImovelEntity(
        0,
        "Apartamento Beira Mar",
        "Rua Beira Mar, 10",
        "19282-9238",
        "Bairro Beira Mar",
        "Cidade Beira Mar - SP",
        1900.0,
        true
      ).toJSON(),
      usuario: new UsuarioEntity(
        0,
        "Fulano da Silva",
        "fulano@gmail.com",
        true,
        "abc123",
        new PerfilEntity(1, "Administrador").toJSON()
      ).toJSON(),
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
}

const routes = [
  "./routes/autenticacaoRoute.js",
  "./routes/usuarioRoute.js",
  "./routes/imovelRoute.js",
  "./routes/locacaoRoute.js"
]
const outputJson = "./swaggerOutput.json"

swaggerAutogen({ openapi: "3.0.0", autoHeaders: false })(
  outputJson,
  routes,
  doc
).then(async () => {
  await import("./server.js")
})
