import fs from "node:fs"
import Database from "better-sqlite3"

/**
 * Configurações do Banco de Dados
 */ 
class SQLite3DB {
    // banco de dados
    private db: Database.Database

    // segurança adicional para operações no banco de dados. Funções não podem ser executadas se o ambiente não foi configurado e ativo
    private configured: boolean = false

    constructor() {
        // Faz o bind da função Transaction para garantir que o ponteiro this permanecerá entre chamadas de wrappers
        this.Transaction = this.Transaction.bind(this)
    }

    /**
     * Cria a instância do banco de dados na memória
     */
    private CreateDatabase() {
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

    /**
     * Retorna uma referência ao banco de dados na memória
     * @throws ``Error`` Banco de dados não configurado
     */
    get DB(): Database.Database {
        if (!this.configured) {
            throw new Error("Database not configured yet.")
        }

        return this.db
    }

    /**
     * Executa múltiplas ações do banco de dados com rollback (cancelamento de operação com restauração) automático.
     * 
     * @param callback ``(...args: any[]) => unknown`` Função que será executada.
     * @param ...args ``any[]`` Argumentos que serão passados para essa função.
     * @returns ``unknown`` Último retorno de callback.
     * @throws ``Error`` Se alguma operação falhou.
     */
    Transaction(callback: (...args: any[]) => unknown, ...args: any[]): unknown {
        return this.DB.transaction(callback)(...args)
    }

    /**
     * Carrega todas as migrations do banco de dados
     */
    private LoadMigrations() {
        try {
            // Busca todos os arquivos da pasta migrations
            let files = fs.readdirSync(process.env.SQL_INSTRUCTIONS_PATH + "migrations")

            // Executa cada migration por vez
            for (let filename of files) {
                let migration = this.ReadSQLFile("migrations/" + filename)
                this.DB.exec(migration)
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error("Unable to load database migrations.", { cause: err.message })
            }

            throw new Error("Unable to load database migrations: unexpected error.")
        }
    }

    /**
     * Lê um arquivo de instrução SQL na memória. Os diretórios onde são guardados esses arquivos são definidos nas variáveis de ambiente.
     * 
     * @param filename O nome do arquivo
     * @returns ``string`` O conteúdo do arquivo4
     * @throws ``Error`` Banco de dados não configurado
     */ 
    ReadSQLFile(filename: string): string {
        if (!this.configured) {
            throw new Error("Database not configured yet.")
        }

        let SQLInstructionsPath = process.env.SQL_INSTRUCTIONS_PATH

        try {
            let instruction = fs.readFileSync(SQLInstructionsPath + filename)
            return String(instruction)
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error("Unable to read SQL File instructions.", { cause: err.message })
            }

            throw new Error("Unable to read SQL File instructions: unexpected error.")
        }
    }

    /**
     * Verifica se todos os recursos de configuração são válidos.
     */
    private CheckConfigurations() {
        let configurations = ["SQL_INSTRUCTIONS_PATH", "DATABASE_PATH", "DATABASE_NAME"]
        let errors = 0

        for (let id of configurations) {
            let config = process.env[id]

            if (config === undefined) {
                console.log(`Missing environment configuration for database: ${id}.`)
                errors++
            } else if (config === "") {
                console.log(`Invalid environment configuration for database: ${id}.`)
                errors++
            }
        }

        if (errors !== 0) {
            throw new Error()
        }

        this.configured = true
    }

    /**
     * Carrega todas as definição do banco de dados. As demais funções do wrapper não funcionam caso não haja nenhuma configuração válida.
     */
    LoadDatabase() {
        // Verifica se todas as configurações estão nos conformes
        this.CheckConfigurations()
     
        // Criação do banco de dados
        this.CreateDatabase()

        // Instancia o banco de dados no servidor
        let database_path = process.env.DATABASE_PATH + "sqlite3/"
        let database_name = process.env.DATABASE_NAME

        this.db = new Database(database_path + database_name)
        this.db.pragma("journal_mode = WAL")

        // Cria as tabelas do banco de dados
        this.LoadMigrations()
    }
} 

const sqlite3db = new SQLite3DB()

// Tipos de dados importantes

export default sqlite3db
