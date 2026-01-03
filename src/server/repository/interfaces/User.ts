// Operações com usuários

import { User } from "@models/User.js"
import { Email } from "@models/Email.js"

// Gerenciamento geral usuários
interface IUserManagement {
    SaveUser(user: User): boolean // cria um usuário do banco de dados
    DeleteUser(user: User): boolean // deleta um usuário do banco de dados
    UpdateUser(user: User): boolean // modifica as informações de um usuário no banco de dados
}

// Pesquisa de usuários
interface IUserSearch {
    FindUserByEmail(email: Email): User | null // encontra um usuário pesquisando pelo e-mail
    FindUsersByName(name: string): Array<User> | null // encontra todos os usuários que possuem determinado nome
}

export type { IUserManagement, IUserSearch }
