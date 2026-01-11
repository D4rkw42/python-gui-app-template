// Implementação das operações com License no SQLite3

import sqlite3db from "@database/db/sqlite3/db.js"

import { ILicenseManagementRepository } from "@repository/License.repository.js"
import License from "@resources/types/License.js"

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

export { SQLite3LicenseManagementRepository }
