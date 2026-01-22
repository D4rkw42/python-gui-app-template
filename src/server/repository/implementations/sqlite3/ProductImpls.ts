// Implementação das operações com Product no SQLite3

import sqlite3db from "@database/db/sqlite3/db.js"

import { IProductManagementRepository, IProductSearchRepository } from "@repository/Product.repository.js"

import IProductModel from "@database/models/IProduct.model.js"

import Product from "@resources/types/Product.js"
import User from "@resources/types/User.js"

class SQLite3ProductManagementRepository implements IProductManagementRepository {
    Activate(product: Product): boolean {
        // Preparação do comando no banco de dados
        let activationST = sqlite3db.DB.prepare(`
            UPDATE Products
            SET is_activated = true
            WHERE build_id = ?;
        `)

        // Executa a ação do banco de dados e obtém a quantidade de mudanças
        let changes = activationST.run(product.buildID).changes

        // Operação bem sucedida se houve mudanças
        return changes !== 0
    }

    UpdateInstallInfo(product: Product, installID: string, fingerprint: string): boolean {
        // Comando no banco de dados
        let infoUpdateST = sqlite3db.DB.prepare(`
            UPDATE Products
            SET install_id = ?, fingerprint = ?
            WHERE build_id = ?;
        `)

        // Executa o comando no banco de dados e obtém a quantidade de mudanças
        let changes = infoUpdateST.run(installID, fingerprint, product.buildID).changes

        // Operação bem sucedida se houve mudanças
        return changes !== 0
    }
    
    SaveProduct(product: Product): boolean {
        // Preparação do comando para criar produto na tabela Products 
        let productST = sqlite3db.DB.prepare(`
            INSERT INTO Products (build_id, owner_id, project_name)
            VALUES (?, ?, ?);
        `)

        // Execução da criação de produtos
        let changes = productST.run(product.buildID, product.ownerId, product.projectName).changes

        // Criação bem sucedida se houve mudanças
        return changes !== 0
    }
}

class SQLite3ProductSearchRepository implements IProductSearchRepository {
    FindUserProducts(user: User): Array<Product> | null {
        // Comando no banco de dados
        let productsST = sqlite3db.DB.prepare(`
            SELECT * FROM Products
            WHERE owner_id = ?;
        `)

        // Executa o comando e obtém todos os produtos encontrados
        let products = productsST.all(user.id) as Array<IProductModel>

        // Nenhum produto encontrado
        if (products.length === 0) {
            return null
        }

        // Retorna todos os produtos encontrados
        return products.map(product => new Product({
            buildID: product.build_id,
            ownerId: product.owner_id,
            projectName: product.project_name,
            installID: product.install_id,
            fingerprint: product.fingerprint,
            isActivated: product.is_activated
        }))
    }
}

export { SQLite3ProductManagementRepository, SQLite3ProductSearchRepository }
