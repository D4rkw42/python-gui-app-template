// Operações com licenças

import License from "@resources/types/License.js"
import Product from "@resources/types/Product.js"

/**
 * Gerenciamento geral de licenças
 */ 
interface ILicenseManagementRepository {
    /**
     * Cria uma nova licença no banco de dados.
     * 
     * @param license ``License`` Informações da licença.
     * @returns ``boolean`` se a operação foi bem sucedida.
     */
    SaveLicense(license: License): boolean
}

/**
 * Pesquisa de licenças
 */
interface ILicenseSearchRepository {
    /**
     * Encontra uma licença pesquisando pelo produto através do identificador de build.
     * 
     * @param product ``Product`` O produto especificado.
     * @returns ``License`` se bem sucedido ou ``null`` caso contrário.
     */
    FindLicenseByProduct(product: Product): License | null
}

export type { ILicenseManagementRepository, ILicenseSearchRepository }
