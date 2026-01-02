import app from "@server/app.js"
import sqlite3db from "@server/database/db/sqlite3/db.js"

// configuração de porta do express
const DEFAULT_PORT = 3000

let PORT = process.env.PORT ?? DEFAULT_PORT
PORT = (typeof PORT === "number")? PORT : DEFAULT_PORT

// configura .env local caso em modo de desenvolvimento
if (process.env.NODE_ENV !== "production") {
    const dotenv = await import("dotenv")
    dotenv.config()
}

// configuração do banco de dados
sqlite3db.LoadDatabase()

// Inicialização do servidor
app.listen(PORT, () => console.log("Listening on port", PORT))
