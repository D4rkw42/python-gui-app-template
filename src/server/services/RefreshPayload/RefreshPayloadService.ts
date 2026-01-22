// Controlador de requisições HTTP do serviço "Refresh Payload"

import { IPayloadSearchRepository } from "@repository/Payload.repository.js"
import { IProductSearchRepository } from "@repository/Product.repository.js"

import { IPayload } from "@resources/shared/services/Payload.js"

// Exceções do serviço "Refresh Payload"
enum RefreshPayloadServiceException {
    ProductNotExists,
    ProductNotActivated,
    InvalidFingerprint,
    InvalidPayload,
    PayloadNotExpired,
    UnexpectedError
}

// Propriedades para executar o serviço "Refresh Payload"
interface IRefreshPayloadServiceProps {
    payload: IPayload,
    installID: string,
    fingerprint: string
}

// Dados exporttados pelo serviço "Refresh Payload"
interface IRefreshPayloadServiceExport {
    export: {
        payload: IPayload,
        token: string
    }
}

class RefreshPayloadService {
    private payloadSearchRepository: IPayloadSearchRepository
    private productSearchRepository: IProductSearchRepository

    constructor(payloadSearchRepository: IPayloadSearchRepository, productSearchRepository: IProductSearchRepository) {
        this.payloadSearchRepository = payloadSearchRepository
        this.productSearchRepository = productSearchRepository
    }

    Load(props: IRefreshPayloadServiceProps): IRefreshPayloadServiceExport {
        throw new Error("Not implemented yet.")
    }
}

export default RefreshPayloadService
export { RefreshPayloadServiceException }
