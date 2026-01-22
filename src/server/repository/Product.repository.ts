// Operações com produtos

import Product from "@resources/types/Product.js"
import User from "@resources/types/User.js"

/**
 * Gerenciamento geral de produtos
 */ 
interface IProductManagementRepository {
    /**
     * Cria um novo produto no banco de dados.
     * 
     * @param product ``Product`` Informações do produto.
     * @returns ``boolean`` se a operação foi bem sucedida.
     */
    SaveProduct(product: Product): boolean

    /**
     * Atualiza o campo ``IsActivated`` do produto na tabela para ``true``.
     * 
     * @param product ``Product`` O produto que sofrerá a atualização.
     * @returns ``boolean`` Se a operação foi bem sucedida.
     */
    Activate(product: Product): boolean

    /**
     * Atualiza as informações de instalação do produto
     * 
     * @param product ``Product`` O produto a ser atualizado.
     * @param installID ``string`` Campo ``install_id``.
     * @param fingerprint ``string`` Campo ``fingerprint``.
     * @returns ``boolean`` Se a operação fo bem sucedida.
     */
    UpdateInstallInfo(product: Product, installID: string, fingerprint: string): boolean
}

/**
 * Pesquisa de produtos
 */
interface IProductSearchRepository {
    /**
     * Retorna todos os produtos vinculados ao usuário designado.
     * 
     * @param user ``User`` O usuário para busca.
     * @returns ``Array<Product>`` Lista de todos os produtos do usuário ou ``null`` caso ele não tenha produtos registrados.
     */
    FindUserProducts(user: User): Array<Product> | null
}

export type { IProductManagementRepository, IProductSearchRepository }
