import { IUserManagement, IUserSearch } from "@repository/interfaces/User.js"

import { User } from "@models/User.js"
import { Email } from "@models/Email.js"

import ServerError from "@utils/ServerError.js"

// Serviço de criação de usuários
class CreateUserService {
    private userManagementRepository: IUserManagement
    private userSearchRepository: IUserSearch

    constructor(userManagementRepository: IUserManagement, userSearchRepository: IUserSearch) {
        this.userManagementRepository = userManagementRepository
        this.userSearchRepository = userSearchRepository
    }

    async load(props: { name: string, email: Email }): Promise<boolean> {
        // verifica se o usuário já existe no sistema
        let user = this.userSearchRepository.FindUserByEmail(props.email)

        // proteção contra criação de novo usuário
        if (user !== null) {
            throw new ServerError({ message: "This e-mail is already registered" })
        }

        // cria um novo usuário
        user = new User(props)
        return this.userManagementRepository.SaveUser(user)
    }
}

export default CreateUserService
