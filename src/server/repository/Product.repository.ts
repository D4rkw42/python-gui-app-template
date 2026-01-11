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
     * @param product Informações do produto.
     * @returns ``boolean`` se a operação foi bem sucedida.
     */
    SaveProduct(product: Product): boolean
}

/**
 * Pesquisa de produtos
 */
interface IProductSearchRepository {
    /**
     * Retorna todos os produtos vinculados ao usuário designado.
     * 
     * @param user O usuário para busca.
     * @returns ``Array<Product>`` Lista de todos os produtos do usuário ou ``null`` caso ele não tenha produtos registrados.
     */
    FindUserProducts(user: User): Array<Product> | null
}

export type { IProductManagementRepository, IProductSearchRepository }
