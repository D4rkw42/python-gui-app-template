// Definição do serviço de ativação do produto

import { IPayload } from "@resources/shared/services/Payload.js"

/**
 * Propriedades do serviço "ActivateApp"
 */
interface IActivateAppProps {

}

/**
 * Dados do Payload e token que são exportados pelo serviço "ActivateApp"
 */
interface IActivateProductExport {
    export: {
        payload: IPayload
        token: string
    }
}

class ActivateAppService {
    load(props: IActivateAppProps): IActivateProductExport {
        throw new Error("Not implemented yet.")
    }
}

export default ActivateAppService
