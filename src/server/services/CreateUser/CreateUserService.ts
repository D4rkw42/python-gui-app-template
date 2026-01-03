import { IUserManagement, IUserSearch } from "@repository/interfaces/User.js"

import { User } from "@models/User.js"

import ServerError from "@server/utils/Exception/ServerException.js"

// Códigos de Erros locais retornados pelo servico
enum CreateServiceException {
    EmailAlreadyRegistered,
    UnexpectedError
}

// Serviço de criação de usuários
class CreateUserService {
    private userManagementRepository: IUserManagement
    private userSearchRepository: IUserSearch

    constructor(userManagementRepository: IUserManagement, userSearchRepository: IUserSearch) {
        this.userManagementRepository = userManagementRepository
        this.userSearchRepository = userSearchRepository
    }

    load(props: { name: string, email: string }) {
        // verifica se o usuário já existe no sistema
        let user = this.userSearchRepository.FindUserByEmail(props.email)

        // proteção contra criação de novo usuário
        if (user !== null) {
            throw new ServerError({ message: "Não foi possível criar o usuário.", cause: "O e-mail informado já está registrado." }, CreateServiceException.EmailAlreadyRegistered)
        }

        // cria um novo usuário
        user = new User(props)
        let success = this.userManagementRepository.SaveUser(user)

        if (!success) {
            throw new ServerError({ message: "Não foi possível criar o usuário.", cause: "Erro inesperado." }, CreateServiceException.UnexpectedError)
        }
    }
}

export default CreateUserService
export { CreateServiceException }
