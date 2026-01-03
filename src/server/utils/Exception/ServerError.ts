// Classe simples para erros
class ServerException extends Error {
    public description: IServerDescription
    public exception: number

    constructor(description: IServerDescription, exception: number) {
        super(description.message, { cause: description.cause })

        this.description = description
        this.exception = exception
    }

    get UserMessage(): string {
        return `${this.description.message}${this.description.cause? " Reason:\n" + this.description.cause : ""}`
    }
}

// Modelo da mensagem de erro
interface IServerDescription {
    message: string
    cause?: string
}

export default ServerException
export type { IServerDescription }
