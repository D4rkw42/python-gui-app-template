// Operações com Payloads

import IPayloadModel from "@database/models/IPayload.model.js"

import Product from "@resources/types/Product.js"
import { IPayload } from "@resources/shared/services/Payload.js"

// Pesquisa de payloads
interface IPayloadSearchRepository {
    /**
     * Encontra um payload salvo no banco de dados através do id de instalação do produto.
     * 
     * @param productInstallId ``string`` O id de instalação do produto ao qual o payload pertence.
     * @returns ``IPayload`` se o payload existir ou ``null`` caso o produto não tenha payload ou não exista.
     */
    FindPayloadByInstallId(productInstallId: string): IPayloadModel | null
}

// Gerenciamento de payloads
interface IPayloadManagementRepository {
    /**
     * Salva um novo payload no banco de dados
     * 
     * @param payload ``Payload`` Payload a ser salvo
     * @param token ``string`` Token hash do referido payload.
     * @returns ``boolean`` Se a operação foi bem sucedida
     */
    SavePayload(payload: IPayload, token: string): boolean
}

export type { IPayloadSearchRepository, IPayloadManagementRepository }
