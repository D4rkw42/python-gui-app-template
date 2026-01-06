// Operações com usuários

import User from "@resources/types/User.js"

/**
 * Gerenciamento geral usuários
 */ 
interface IUserManagementRepository {
    /**
     * Cria um novo usuário no banco de dados
     * 
     * @param user Informações do usuário
     */
    SaveUser(user: User): boolean
    DeleteUser(user: User): boolean // deleta um usuário do banco de dados
    UpdateUser(user: User): boolean // modifica as informações de um usuário no banco de dados
}

/**
 * Pesquisa de usuários
 */
interface IUserSearchRepository {
    /**
     * Encontra um usuário pesquisando pelo e-mail
     * 
     * @param email O e-mail do usuário
     * @returns ``User`` se bem sucedido ou ``null`` caso contrário
     */
    FindUserByEmail(email: string): User | null
    FindUsersByName(name: string): Array<User> | null // encontra todos os usuários que possuem determinado nome

    /**
     * Obtém uma quantidade determinada de usuários do banco de dados a partir do índice informado
     * 
     * @param startAt Índice incial de busca
     * @param limit Quantidade de usuários a ser obtidos
     * @returns ``Array<User>`` como a lista de usuários ou ``null`` caso a especificação não seja encontrada
     */
    ListUsers(startAt: number, limit: number): Array<User> | null // obtém todos os usuários do banco de dados a partir de certo ponto
}

export type { IUserManagementRepository, IUserSearchRepository }
