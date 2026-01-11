// Serviço de Listagem de Usuários

import User from "@resources/types/User.js";
import { IUserSearchRepository } from "@repository/User.repository.js";

/**
 * Propriedades para execução do serviço ``ListUsers``
 */
interface IListUsersProps {
    startAt: number
    limit: number
}

/**
 * Listagem de usuários a partir dos dados informados
 */
class ListUsersService {
    private userSearchRepository: IUserSearchRepository

    constructor(userSearchRepository: IUserSearchRepository) {
        this.userSearchRepository = userSearchRepository
    }

    /**
     * Executa o serviço de listagem de usuários
     * 
     * @param startAt ``number`` Índice de busca inicial
     * @param limit ``number`` Quantidade de usuários requeridos
     * @returns A lista de usuários ou ``null`` se não encontrar: ``Array<User> | null`` 
     */
    load(props: IListUsersProps): Array<User> | null {
        return this.userSearchRepository.ListUsers(props.startAt, props.limit)
    }
}

export default ListUsersService
