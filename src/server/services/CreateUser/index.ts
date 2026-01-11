// Definições do serviço CreateUser

import { SQLite3UserManagementRepository, SQLite3UserSearchRepository } from "@repository/implementations/sqlite3/UserImpl.js"

import CreateUserService from "@services/CreateUser/CreateUserService.js"
import CreateUserController from "@services/CreateUser/CreateUserController.js"

// Instancia as estratégias de operação do banco de dados
let sqlite3UserManagement = new SQLite3UserManagementRepository()
let sqlite3UserSearch = new SQLite3UserSearchRepository()

// Instancia serviços e controllers
let createUserService = new CreateUserService(sqlite3UserManagement, sqlite3UserSearch)
let createUserController = new CreateUserController(createUserService)

export { createUserService, createUserController }
