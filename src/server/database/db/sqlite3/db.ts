import fs from "fs"

import Database from "better-sqlite3"

// Configurações do Banco de Dados
class SQLite3DB {
    // banco de dados
    public db: Database.Database

    PrepareTables() {
        // tabela de usuários
        let userTB = this.db.prepare(this.ReadSQLFile("migrations/Users.sql"))

        // tabela de chaves de autenticação
        let authInfoRegisterTB = this.db.prepare(this.ReadSQLFile("migrations/AuthInfoRegister.sql"))

        // criando tabelas
        userTB.run()
        authInfoRegisterTB.run()
    }

    ReadSQLFile(filename: string): string {
        if (!process.env.SQL_INSTRUCTIONS_PATH) {
            throw new Error("Missing environment configuration for database")
        }

        if (typeof process.env.SQL_INSTRUCTIONS_PATH !== "string") {
            throw new Error("Invalid environment configuration for database")
        }

        let SQLInstructionsPath = process.env.SQL_INSTRUCTIONS_PATH

        try {
            let instruction = fs.readFileSync(SQLInstructionsPath + filename)
            return String(instruction)
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error("Unable to read SQL File instructions", { cause: err.message })
            }

            throw new Error("Unable to read SQL File instructions: unexpected error")
        }
    }

    CreateDatabase() {
        if (!(process.env.DATABASE_PATH && process.env.DATABASE_NAME)) {
            throw new Error("Missing environment configuration for database")
        }

        if (typeof process.env.DATABASE_PATH !== "string" || typeof process.env.DATABASE_NAME !== "string") {
            throw new Error("Invalid environment configuration for database")
        }

        let database_path = process.env.DATABASE_PATH + "sqlite3/"
        let database_name = process.env.DATABASE_NAME

        // verifica se o banco de dados já existe
        if (fs.existsSync(database_path + database_name)) {
            return
        }

        // cria um banco de dados novo
        try {
            fs.mkdirSync(database_path, { recursive: true })
            fs.writeFileSync(database_path + database_name, "")
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error("Unable to create database", { cause: err.message })
            }

            throw new Error("Unable to create database: unexpected error")
        }
    }

    LoadDatabase() {
        // Criação do banco de dados
        this.CreateDatabase()

        // Instancia o banco de dados no servidor
        let database_path = process.env.DATABASE_PATH + "sqlite3/"
        let database_name = process.env.DATABASE_NAME

        this.db = new Database(database_path + database_name)
        this.db.pragma("journal_mode = WAL")

        // Cria as tabelas do banco de dados
        this.PrepareTables()
    }
} 

let sqlite3db = new SQLite3DB()

// Tipos de dados importantes

export default sqlite3db
