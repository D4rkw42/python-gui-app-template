import express from "express"
import cors from "cors";

import AdminRouter from "@server/routes/admin.js"
import AuthRouter from "@server/routes/auth.js"

const app = express();

app.use(express.json())
app.use(cors())

// declaração de rotas
app.use("/admin", AdminRouter) // admin: painel de controle do desenvolvedor
app.use("/auth", AuthRouter) // auth: controle de autenticação de usuários

export default app
