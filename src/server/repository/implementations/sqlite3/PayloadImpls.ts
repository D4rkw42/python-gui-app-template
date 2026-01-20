// Implementação das operações com Payload feita com SQLite3

import sqlite3db from "@database/db/sqlite3/db.js"

import IPayloadModel from "@database/models/IPayload.model.js"

import { IPayloadSearchRepository, IPayloadManagementRepository } from "@repository/Payload.repository.js"
import { IPayload } from "@resources/shared/services/Payload.js"

class SQLite3PayloadSearchRepository implements IPayloadSearchRepository {
    FindPayloadByInstallId(productInstallId: string): IPayloadModel | null {
        // Comando para o banco de dados
        let payloadST = sqlite3db.DB.prepare(`
            SELECT * FROM Payloads
            WHERE product_install_id = ?;    
        `)

        // Obtém o payload selecionado
        let payload = payloadST.get(productInstallId) as IPayloadModel | undefined

        // Retorn o payload ou null caso não exista
        return payload? payload : null
    }
}

class SQLite3PayloadManagementRepository implements IPayloadManagementRepository {
    SavePayload(payload: IPayload, token: string): boolean {
        // Comando no banco de dados
        let payloadST = sqlite3db.DB.prepare(`
            INSERT INTO Payloads (product_install_id, token)
            VALUES (?, ?);
        `)

        // Executa o comando e obtém o número de mudanças nas linhas
        let changes = payloadST.run(payload.installId, token).changes

        // Resultado bem sucedido se houve alguma mudança
        return changes !== 0
    }
}

export { SQLite3PayloadSearchRepository, SQLite3PayloadManagementRepository }
