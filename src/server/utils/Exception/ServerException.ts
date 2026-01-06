// Classe simples para erros

/**
 * Representa um erro do servidor
 * @extends ``Error``
 */
class ServerException extends Error {
    public description: IServerExceptionDescription
    public exception: number

    constructor(description: IServerExceptionDescription, exception: number) {
        super(description.message, { cause: description.cause })

        this.description = description
        this.exception = exception
    }

    /**
     * Gera uma mensagem de erro formatada para o usuário
     * @returns ``string``
     */
    get UserMessage(): string {
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
