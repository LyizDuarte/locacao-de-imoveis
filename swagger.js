import swaggerAutogen from "swagger-autogen"
import ImovelEntity from "./entities/imovelEntity.js"
import UsuarioEntity from "./entities/usuarioEntity.js"
import PerfilEntity from "./entities/perfilEntity.js"
const doc = {
  host: "localhost:5000",
  info: {
    title: "API REST - PFS2",
    description: "API utilizando os padrões REST na disciplina de programação Full Stack 2",
  },
  components: {
    schemas: {
      usuario: new UsuarioEntity(
        0,
        "Fulano da Silva",
        "fulano@gmail.com",
        true,
        "abc123",
        new PerfilEntity(1, "Administrador").toJSON()
      ).toJSON(),
    },
    "@schemas": {
      imovel: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            required: false,
          },
          descricao: {
            example: "Casa em Paraisópolis",
            type: "string",
            required: true,
          },
          cep: {
            example: 1928320,
            type: "string",
            required: true,
          },
          endereco: {
            example: "Rua Dezesete, 10",
            type: "string",
            required: true,
          },
          bairro: {
            example: "Bairro do Paraiso",
            type: "string",
            required: true,
          },
          cidade: {
            example: "São Paulo",
            type: "string",
            required: true,
          },
          valor: {
            example: 800,
            type: "number",
            required: true,
          },
          disponivel: {
            example: "S",
            type: "string",
            required: true,
          },
          imagens: {
            type: "array",
            items: {
              type: "string",
              format: "binary",
            },
          },
        },
      },
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
  "./routes/locacaoRoute.js",
  "./routes/aluguelRoute.js",
  "./routes/perfilRoute.js",
]
const outputJson = "./swaggerOutput.json"

swaggerAutogen({ openapi: "3.0.0", autoHeaders: false })(outputJson, routes, doc).then(async () => {
  await import("./server.js")
})
