// Lista todos os usuários

import { User } from "@server/models/User.js";
import { IUserSearch } from "@server/repository/interfaces/User.js";

class ListAllUsersService {
    private userSearchRepository: IUserSearch

    constructor(userSearchRepository: IUserSearch) {
        this.userSearchRepository = userSearchRepository
    }

    load(startAt: number, limit: number): Array<User> | null{
        return this.userSearchRepository.ListAllUsers(startAt, limit)
    }
}

export default ListAllUsersService
