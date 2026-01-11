import Setup from "@server/setup.js"
import app from "@server/app.js"

import sqlite3db from "@database/db/sqlite3/db.js"

// configura .env local caso em modo de desenvolvimento
if (process.env.NODE_ENV !== "production") {
    const dotenv = await import("dotenv")
    dotenv.config()
}

// Execução de configurações de ambiente
Setup()

// configuração de porta do express
const DEFAULT_PORT = 3000

let PORT = (process.env.PORT === "")? DEFAULT_PORT : process.env.PORT
PORT = Number(process.env.PORT) || DEFAULT_PORT

// configuração do banco de dados
sqlite3db.LoadDatabase()

// Inicialização do servidor
app.listen(PORT, () => console.log("Listening on port", PORT))
