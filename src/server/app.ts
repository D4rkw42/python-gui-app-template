import express from "express"
import cors from "cors"

import AdminRouter from "@routes/admin.js"
import AppRouter from "@routes/app.js"

const app = express()

app.use(express.json())
app.use(cors())

// declaração de rotas
app.use("/admin", AdminRouter) // admin: painel de controle do desenvolvedor
app.use("/app", AppRouter) // app: controle do app e autenticações

export default app
