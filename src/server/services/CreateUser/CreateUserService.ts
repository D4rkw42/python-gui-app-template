import { IUserManagementRepository, IUserSearchRepository } from "@repository/User.repository.js"

import User from "@resources/types/User.js"

import ServerError from "@utils/Exception/ServerException.js"

/**
 * Códigos de Erros locais retornados pelo servico ``CreateUser``
 */
enum CreateUserServiceException {
    EmailAlreadyRegistered,
    UnexpectedError
}

/**
 * Propriedades para execução do servicço ``CreateUser``
 */
interface ICreateUserServiceProps {
    name: string
    email: string
}

/**
 * Criação de usuários a partir dos dados informados
 */
class CreateUserService {
    private userManagementRepository: IUserManagementRepository
    private userSearchRepository: IUserSearchRepository

    constructor(userManagementRepository: IUserManagementRepository, userSearchRepository: IUserSearchRepository) {
        this.userManagementRepository = userManagementRepository
        this.userSearchRepository = userSearchRepository
    }

    /**
     * Executa o serviço de criação de usuários
     * 
     * @param props ``CreateUserServiceProps`` Parâmetros para criação do usuário
     * @throws ``ServerError`` E-mail já registrado no banco de dados
     * @throws ``ServerError`` Erro desconhecido ao tentar registrar o usuário no banco de dados
     */
    load(props: ICreateUserServiceProps) {
        // verifica se o usuário já existe no sistema
        let user = this.userSearchRepository.FindUserByEmail(props.email)

        // proteção contra criação de novo usuário
        if (user !== null) {
            throw new ServerError(
                CreateUserServiceException.EmailAlreadyRegistered,
                { message: "Este usuário já existe.", cause: "O e-mail informado já está registrado." }
            )
        }

        // cria um novo usuário
        user = new User(props)
        let success = this.userManagementRepository.SaveUser(user)

        if (!success) {
            throw new ServerError(
                CreateUserServiceException.UnexpectedError,
                { message: "Não foi possível criar o usuário.", cause: "Erro inesperado." }
            )
        }
    }
}

export default CreateUserService
export { CreateUserServiceException }
