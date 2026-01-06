// Classe simples para erros HTTP

import ServerException, { IServerExceptionDescription } from "@utils/Exception/ServerException.js";

/**
 * Representa um erro HTTP no servidor
 * @extends ``ServerException``
 */
class HttpException extends ServerException {
    public status: number

    constructor(description: IServerExceptionDescription, exception: number, httpStatusCode: number) {
        super(description, exception)
        this.status = httpStatusCode
    }
}

export default HttpException
