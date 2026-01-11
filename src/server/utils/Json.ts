// Classe auxiliar para leitura e escrita de Json

import fs from "node:fs"

/**
 * Leitura e Gravação de arquivos Json
 */
class Json {
    private object: any
    private path: string

    constructor(path: string) {
        try {
            let content = fs.openSync(path, "r").toString()

            this.object = JSON.parse(content) as Object
            this.path = path
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(`Can't read file ${path}.`)
            } else if (err instanceof SyntaxError) {
                throw new Error("Invalid Json file provided.")
            }
        }
    }

    /**
     * Retorna um objeto JSON para letura e modificação.
     * 
     * @returns ``any``
     */
    get Read(): any {
        return this.object
    }

    /**
     * Salva o objeto JSON no mesmo arquivo de leitura.
     * 
     * @throws ``Error`` Caso o arquivo não seja encontrado.
     */
    Save() {
        try {
            let data = JSON.stringify(this.object)
            fs.writeFileSync(this.path, data, { encoding: "utf-8" })
        } catch {
            throw new Error(`Can't read file ${this.path}.`)
        }
    }
}

export default Json
