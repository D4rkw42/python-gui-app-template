// Definição do serviço de ativação do produto

import { BinaryToTextEncoding } from "node:crypto"

import { IUserSearchRepository } from "@repository/User.repository.js"
import { IProductManagementRepository, IProductSearchRepository } from "@repository/Product.repository.js"
import { ILicenseSearchRepository } from "@repository/License.repository.js"
import { IPayloadManagementRepository, IPayloadSearchRepository } from "@repository/Payload.repository.js"

import TransactionManager from "@database/TransactionManager.js"

import { IPayload, CreatePayload, GeneratePayloadToken } from "@resources/shared/services/Payload.js"

import LicenseValidation from "@core/types/License/License.validation.js"

import Product from "@resources/types/Product.js"
import License from "@resources/types/License.js"

import ServerException from "@utils/Exception/ServerException.js"
import { OpenJsonConfig } from "@utils/Config.js"


/**
 * Exceções lançadas pelo serviço "ActivateApp"
 */

enum ActivateAppServiceException {
    UserNotRegistered,
    UserAndProductMismatch,
    ProductAlreadyActivated,
    InvalidProductKey,
    ProductInstallationAlreadyExists,
    UnexpectedError
}

/**
 * Propriedades do serviço "ActivateApp"
 */
interface IActivateAppProps {
    userEmail: string
    productKey: string
    buildID: string
    installID: string
    fingerprint: string
}

/**
 * Dados do Payload e token que são exportados pelo serviço "ActivateApp"
 */
interface IActivateAppExport {
    export: {
        payload: IPayload
        token: string
    }
}

class ActivateAppService {
    private userSearchRepository: IUserSearchRepository

    private productSearchRepository: IProductSearchRepository
    private productManagementRepository: IProductManagementRepository

    private licenseSearchRepository: ILicenseSearchRepository

    private payloadSearchRepository: IPayloadSearchRepository
    private payloadManagementRepository: IPayloadManagementRepository

    private transactionManager: TransactionManager

    constructor(
        userSearchRepository: IUserSearchRepository,
        productSearchRepository: IProductSearchRepository,
        productManagementRepository: IProductManagementRepository,
        licenseSearchRepository: ILicenseSearchRepository,
        payloadSearchRepository: IPayloadSearchRepository,
        payloadManagementRepository: IPayloadManagementRepository,
        transactionManager: TransactionManager
    ) {
        this.userSearchRepository = userSearchRepository

        this.productSearchRepository = productSearchRepository
        this.productManagementRepository = productManagementRepository

        this.licenseSearchRepository = licenseSearchRepository

        this.payloadSearchRepository = payloadSearchRepository
        this.payloadManagementRepository = payloadManagementRepository

        this.transactionManager = transactionManager
    }

    load(props: IActivateAppProps): IActivateAppExport {
        // Verificação de existência de usuário

        let user = this.userSearchRepository.FindUserByEmail(props.userEmail)

        if (user === null) {
            throw new ServerException(ActivateAppServiceException.UserNotRegistered, {
                message: "Não foi possível ativar esse produto.",
                cause: "Usuário não existe."
            })
        }

        // Verifica se o produto pertence ao cliente

        let products = this.productSearchRepository.FindUserProducts(user)

        if (products === null) {
            throw new ServerException(ActivateAppServiceException.UserAndProductMismatch, {
                message: "Não foi possível realizar a ativação.",
                cause: "O produto não pertence a este usuárioA."
            })
        }

        let filtered = products.filter(product => product.buildID === props.buildID)

        if (filtered.length === 0) {
            throw new ServerException(ActivateAppServiceException.UserAndProductMismatch, {
                message: "Não foi possível realizar a ativação.",
                cause: "O produto não pertence a este usuárioB."
            })
        }

        let product = filtered[0] as Product
        let license = this.licenseSearchRepository.FindLicenseByProduct(product) as License

        // Verifica se o produto já não está ativo

        if (product.isActivated) {
            throw new ServerException(ActivateAppServiceException.ProductAlreadyActivated, {
                message: "O produto selecionado já foi ativado."
            })
        }

        // Validação da chave do produto

        let licenseConfig = OpenJsonConfig("types/License.config.json")
        let ProductKeySignatureSpecs = licenseConfig.build.productKey.signature

        let productKeyValid = LicenseValidation.ValidateProductKey(
            props.productKey,
            license.salt,
            license.productKey,

            {
                algorithm: ProductKeySignatureSpecs.algorithm as string,
                format: ProductKeySignatureSpecs.format as BinaryToTextEncoding
            }
        )

        if (!productKeyValid) {
            throw new ServerException(ActivateAppServiceException.InvalidProductKey, {
                message: "Não foi possível realizar a ativação.",
                cause: "Chave do produto inválida."
            })
        }

        // Valida se já não existe um payload para esse identificador de instalação

        let payloadSearch = this.payloadSearchRepository.FindPayloadByinstallID(props.installID)

        if (payloadSearch) {
            throw new ServerException(ActivateAppServiceException.ProductInstallationAlreadyExists, {
                message: "Não foi possível ativar esse produto, tente novamente mais tarde."
            })
        }

        // Ativação da licença e criação do payload

        // Transação para execução de todas as operações de uma vez
        function Transaction(...args: any[]): { payload: IPayload, token: string } {
            let productManagementRepository = args[0] as IProductManagementRepository
            let payloadManagementRepository = args[1] as IPayloadManagementRepository

            productManagementRepository.Activate(product) // atualiza campo de ativação do produto
            productManagementRepository.UpdateInstallInfo(product, props.installID, props.fingerprint) // atualiza informações de instalação
        
            // Payload com modo "online" + "token"
            let payload = CreatePayload({ installID: props.installID, mode: "online" })
            let token = GeneratePayloadToken(payload, license.secrets.privateKey)

            payloadManagementRepository.SavePayload(payload, token) // salva o payload no DB

            return { payload, token }
        }

        try {
            let result = this.transactionManager.Load(
                Transaction,
                this.productManagementRepository,
                this.payloadManagementRepository
            ) as { payload: IPayload, token: string }

            return { export: result }
        } catch {
            throw new ServerException(ActivateAppServiceException.UnexpectedError, {
                message: "Não foi possível ativar o produto.",
                cause: "Erro inesperado."
            })
        }
    }
}

export default ActivateAppService
export { ActivateAppServiceException }
