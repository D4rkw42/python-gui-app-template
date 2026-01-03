// Implementação das operações de User com SQlite3

import sqlite3db from "@database/db/sqlite3/db.js"

import { IUserManagement, IUserSearch } from "@repository/interfaces/User.js"

import { User } from "@models/User.js"
import { Email } from "@models/Email.js"

// Gerenciamento geral de usuários
class SQLite3UserManagement implements IUserManagement {
    // Cria um usuário no banco de dados
    SaveUser(user: User): boolean {
        let saveST = sqlite3db.db.prepare(`
            INSERT INTO Users (id, name, email)
            VALUES (?, ?, ?);    
        `)

        // Salva o novo usuário
        let changes = saveST.run(user.id, user.name, user.email.value).changes
        
        // Verifica se houve alteração
        if (changes !== 0) {
            return true
        }

        return false
    }

    // Deleta um usuário no banco de dados
    DeleteUser(user: User): boolean {
        return false
    }

    // Atualiza as informações de um usuário no banco de dados
    UpdateUser(user: User): boolean {
        return false
    }
}

// Pesquisa de usuários
class SQLite3UserSearch implements IUserSearch {
    // Encontra um usuário pesquisando pelo e-mail
    FindUserByEmail(email: Email): User | null {
        let userFoundST = sqlite3db.db.prepare(`
            SELECT * FROM Users
            WHERE email = ?;
        `)

        let user: any | undefined = userFoundST.get(email.value)

        // Retorna o usuário se foi encontrado
        if (user) {
           return new User({ id: user.id, name: user.name, email: new Email(user.email) })
        }

        return null
    }

    // Encontra todos os usuários que possuem determinado nome
    FindUsersByName(name: string): Array<User> | null {
        throw new Error("Method not implemented.")
    }
}

export { SQLite3UserManagement, SQLite3UserSearch }
