// Implementação das operações de User com SQlite3

import sqlite3db from "@database/db/sqlite3/db.js"

import { IUserManagementRepository, IUserSearchRepository } from "@repository/User.repository.js"
import IUserModel from "@database/models/IUser.model.js"

import User from "@resources/types/User.js"

// Gerenciamento geral de usuários
class SQLite3UserManagementRepository implements IUserManagementRepository {
    // Cria um usuário no banco de dados
    SaveUser(user: User): boolean {
        let saveST = sqlite3db.DB.prepare(`
            INSERT INTO Users (id, name, email)
            VALUES (?, ?, ?);    
        `)

        // Salva o novo usuário
        let changes = saveST.run(user.id, user.name, user.email).changes
        
        // Verifica se houve alteração
        if (changes !== 0) {
            return true
        }

        // Erro ao tentar salvar usuário (desconhecido)
        return false
    }
}

// Pesquisa de usuários
class SQLite3UserSearchRepository implements IUserSearchRepository {
    // Encontra um usuário pesquisando pelo e-mail
    FindUserByEmail(email: string): User | null {
        let userFoundST = sqlite3db.DB.prepare(`
            SELECT * FROM Users
            WHERE email = ?;
        `)

        let user = userFoundST.get(email) as IUserModel

        // Retorna o usuário se foi encontrado
        if (user) {
           return new User(user)
        }

        return null
    }

    // obtém todos os usuários do banco de dados a partir de certo ponto
    ListUsers(startAt: number, limit: number): Array<User> | null {
        let usersFoundST = sqlite3db.DB.prepare(`
            SELECT * FROM Users
            LIMIT ? OFFSET ?;
        `)

        let users = usersFoundST.all(limit, startAt) as Array<IUserModel>

        // Retorna null caso não haja usuários registrados
        if (users.length === 0) {
            return null
        }

        return users.map(user => new User(user))
    }
}

export { SQLite3UserManagementRepository, SQLite3UserSearchRepository }
