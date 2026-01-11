// Implementação das operações com Product no SQLite3

import sqlite3db from "@database/db/sqlite3/db.js"

import { IProductManagementRepository } from "@repository/Product.repository.js"
import Product from "@resources/types/Product.js"

class SQLite3ProductManagementRepository implements IProductManagementRepository {
    SaveProduct(product: Product): boolean {
        // Preparação do comando para criar produto na tabela Products 
        let productST = sqlite3db.DB.prepare(`
            INSERT INTO Products (build_id, owner_id)
            VALUES (?, ?);
        `)

        // Execução da criação de produtos
        let changes = productST.run(product.buildId, product.ownerId).changes

        // Criação bem sucedida se houve mudanças
        return changes !== 0
    }
}

export { SQLite3ProductManagementRepository }
