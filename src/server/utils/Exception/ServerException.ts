// Classe simples para erros

/**
 * Representa um erro do servidor
 * @extends ``Error``
 */
class ServerException extends Error {
    public description: IServerExceptionDescription
    public exception: number

    constructor(exception: number, description: IServerExceptionDescription) {
        super(description.message, { cause: description.cause })

        this.exception = exception
        this.description = description
    }

    /**
     * Gera uma mensagem de erro formatada
     * @returns ``string``
     */
    get Formated(): string {
        return `${this.description.message}${this.description.cause? " Motivo:\n" + this.description.cause : ""}`
    }
}

/** 
 * Estrutura da mensagem de ``ServerException``
*/
interface IServerExceptionDescription {
    message: string
    cause?: string
}

export default ServerException
export type { IServerExceptionDescription }
