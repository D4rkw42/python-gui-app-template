// Controlador de rota do serviço "CreateProduct"

import { BinaryToTextEncoding } from "node:crypto"

import { IProductManagementRepository } from "@repository/Product.repository.js"
import { IUserSearchRepository } from "@repository/User.repository.js"
import { ILicenseManagementRepository } from "@repository/License.repository.js"

import LicenseBuilder from "@core/types/License/License.build.js"

import Product from "@resources/types/Product.js"
import License from "@resources/types/License.js"

import ServerException from "@utils/Exception/ServerException.js"
import { OpenJsonConfig } from "@utils/Config.js"

/**
 * Códigos de Erros locais retornados pelo servico ``CreateProduct``
 */
enum CreateProductServiceException {
    EmailNotRegistered,
    UnexpectedError
}

/**
 * Propriedades para executar o serviço CreateProduct
 */
interface ICreateProductProps {
    userEmail: string
}

class CreateProductService {
    private userSearchRepository: IUserSearchRepository
    private productManagementRepository: IProductManagementRepository
    private licenseManagementRepository: ILicenseManagementRepository

    constructor(
        userSearchRepository: IUserSearchRepository,
        productManagementRepository: IProductManagementRepository,
        licenseManagementRepository: ILicenseManagementRepository
    ) {
        this.userSearchRepository = userSearchRepository
        this.productManagementRepository = productManagementRepository
        this.licenseManagementRepository = licenseManagementRepository
    }

    /**
     * Executa o serviço de criação de produtos.
     * 
     * @param props ``{ userEmail: string }`` Parâmetros para criação do produto.
     * @throws ``ServerError`` E-mail não registrado no banco de dados.
     * @throws ``ServerError`` Erro desconhecido ao tentar registrar o produto e/ou a licença do produto no banco de dados.
     */
    load(props: ICreateProductProps) {
        // Verificação da existência do usuário

        let user = this.userSearchRepository.FindUserByEmail(props.userEmail)

        if (!user) {
            throw new ServerException(
                CreateProductServiceException.EmailNotRegistered,
                { message: "Não foi possível criar um produto para esse usuário.", cause: "E-mail não registrado." }
            )
        }

        // Criação do produto
        let product = new Product({ ownerId: user.id })

        // Configuração de parâmetros da licença
        let licenseConfig = OpenJsonConfig("types/License.config.json")

        // Geração das informações que farão parte da licença

        let productKeyLayout = licenseConfig.build.productKey.layout
        let saltLayout = licenseConfig.build.salt.layout
        
        // Chave do Produto
        let productKey = LicenseBuilder.GenerateProductKey({ 
            bytes: productKeyLayout.bytes as Array<number>,
            separator: productKeyLayout.separator as string,
            productKeyFormat: productKeyLayout.format as BufferEncoding,
            signatureFormat: productKeyLayout.signature as BinaryToTextEncoding
        })

        // Salt
        let salt = LicenseBuilder.GenerateRandomSalt(saltLayout.format as BufferEncoding, saltLayout.bytes as number)

        // Chaves Assimétricas
        let secrets = LicenseBuilder.GenerateSecretKeysPair()

        // Gera a licença conforme a configuração
        let license = new License({
            productBuildId: product.buildId,
            productKey: productKey.signature,
            secrets: secrets,
            salt: salt
        })

        // Salva as informação no DB
        let productSaveSuccess = this.productManagementRepository.SaveProduct(product)
        let licenseSaveSuccess = this.licenseManagementRepository.SaveLicense(license)
        
        // Manipulação de erros de criação
        if (!(productSaveSuccess && licenseSaveSuccess)) {
            throw new ServerException(
                CreateProductServiceException.UnexpectedError,
                { message: "Não foi possível criar um produto para esse usuário", cause: "Erro inesperado." }
            )
        }

        // Exporta informações importantes para o controller
        return {
            export: {
                product: { buildId: product.buildId },
                license: { productKey: productKey.raw, publicKey: secrets.publicKey }
            }
        }
    }
}

export default CreateProductService
export { CreateProductServiceException }
