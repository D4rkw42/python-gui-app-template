// classe simples para erros
class ServerError extends Error {
    public description: IServerDescription

    constructor(description: IServerDescription) {
        super(description.message, { cause: description.cause })
        this.description = description
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

export default ServerError
