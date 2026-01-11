// Classe simples para erros HTTP

import ServerException, { IServerExceptionDescription } from "@utils/Exception/ServerException.js";

/**
 * Representa um erro HTTP no servidor
 * @extends ``ServerException``
 */
class HttpException extends ServerException {
    public status: number

    constructor(exception: number, description: IServerExceptionDescription, httpStatusCode: number) {
        super(exception, description)
        this.status = httpStatusCode
    }
}

export default HttpException
