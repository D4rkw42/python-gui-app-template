// Definições do serviço ListAllUsers

import { SQLite3UserSearch } from "@repository/implementations/sqlite3/UserImpl.js";

import ListAllUsersService from "@services/ListAllUsers/ListAllUsersService.js";
import ListAllUsersController from "@services/ListAllUsers/ListAllUsersController.js";

// Instancia as estratégias de operação do banco de dados
let sqlite3UserSearchRepository = new SQLite3UserSearch()

// Instancia serviços e controllers
let listAllUsersService = new ListAllUsersService(sqlite3UserSearchRepository)
let listAllUsersController = new ListAllUsersController(listAllUsersService)

export { listAllUsersService, listAllUsersController }
