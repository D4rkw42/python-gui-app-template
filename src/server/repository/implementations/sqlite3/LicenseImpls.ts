// Implementação das operações com License no SQLite3

import sqlite3db from "@database/db/sqlite3/db.js"

import { ILicenseSearchRepository, ILicenseManagementRepository } from "@repository/License.repository.js"
import ILicenseModel from "@database/models/ILicense.model.js"

import License from "@resources/types/License.js"
import Product from "@resources/types/Product.js"

class SQLite3LicenseSearchRepository implements ILicenseSearchRepository {
    FindLicenseByProduct(product: Product): License | null {
        // Preparação do comando no DB
        let licenseST = sqlite3db.DB.prepare(`
            SELECT * FROM Licenses
            WHERE product_build_id = ?;
        `)

        // Execução do comando no DB para obtenção da licença
        let license = licenseST.get(product.buildId) as ILicenseModel | undefined

        // Retorna licença ou null caso não exista
        return license? new License({
            productBuildId: license.product_build_id,
            productKey: license.product_key,
            secrets: { publicKey: license.public_secret_key, privateKey: license.private_secret_key },
            salt: license.salt
        }) : null
    }
}

/**
 * Responsável pela criação e destruição de dados de Licença no banco de dados
 */
class SQLite3LicenseManagementRepository implements ILicenseManagementRepository {
    /**
     * Salva uma licença no banco de dados.
     * 
     * @param license ``License`` Informações da licença.
     */
    SaveLicense(license: License): boolean {
        // Preparação do comando para inserir informações na tabela Licenses
        let licenseST = sqlite3db.DB.prepare(`
            INSERT INTO Licenses (product_build_id, product_key, public_secret_key, private_secret_key, salt)
            VALUES (?, ?, ?, ?, ?);
        `)

        // Execução do comando no banco de dados
        let changes = licenseST.run(
            license.productBuildId,
            license.productKey,
            license.secrets.publicKey,
            license.secrets.privateKey,
            license.salt
        ).changes

        // Operação bem sucedida se houve mudanças
        return changes !== 0
    }
}

export { SQLite3LicenseSearchRepository, SQLite3LicenseManagementRepository }
