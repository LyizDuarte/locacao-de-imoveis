import express from "express"
import usuarioRoute from "./routes/usuarioRoute.js"
import imovelRoute from "./routes/imovelRoute.js"
import authRoute from "./routes/autenticacaoRoute.js"
import locacaoRoute from "./routes/locacaoRoute.js"
import AluguelRoute from "./routes/aluguelRoute.js"
import swaggerUi from "swagger-ui-express"
import { createRequire } from "module"
import { errorHandler, catchErrors } from "./middlewares/exceptionMiddleware.js"
const require = createRequire(import.meta.url)
const outputJson = require("./swaggerOutput.json")

const app = express()
app.use(express.json())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson))
app.use("/", catchErrors(usuarioRoute))
app.use("/", catchErrors(imovelRoute))
app.use("/", catchErrors(authRoute))
app.use("/", catchErrors(locacaoRoute))
app.use("/", catchErrors(AluguelRoute))

app.use(errorHandler)

app.listen(5000, () => {
  console.log("Backend em execucao")
})
