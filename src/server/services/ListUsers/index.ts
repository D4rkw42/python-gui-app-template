// Definições do serviço ListAllUsers

import { SQLite3UserSearch } from "@repository/implementations/sqlite3/UserImpl.js";

import ListUsersService from "@services/ListUsers/ListUsersService.js";
import ListUsersController from "@services/ListUsers/ListUsersController.js";

// Instancia as estratégias de operação do banco de dados
let sqlite3UserSearchRepository = new SQLite3UserSearch()

// Instancia serviços e controllers
let listUsersService = new ListUsersService(sqlite3UserSearchRepository)
let listUsersController = new ListUsersController(listUsersService)

export { listUsersService, listUsersController }
