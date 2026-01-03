// Classe simples para erros HTTP

import ServerException, { IServerDescription } from "@server/utils/Exception/ServerException.js";

class HttpException extends ServerException {
    public status: number

    constructor(description: IServerDescription, exception: number, httpStatusCode: number) {
        super(description, exception)
        this.status = httpStatusCode
    }
}

export default HttpException
