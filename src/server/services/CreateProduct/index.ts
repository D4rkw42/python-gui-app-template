// Definições do serviço CreateUser

import { SQLite3LicenseManagementRepository } from "@repository/implementations/sqlite3/LicenseImpls.js"
import { SQLite3ProductManagementRepository } from "@repository/implementations/sqlite3/ProductImpls.js"
import { SQLite3UserSearchRepository } from "@repository/implementations/sqlite3/UserImpl.js"

import CreateProductService from "@services/CreateProduct/CreateProductService.js"
import CreateProductController from "@services/CreateProduct/CreateProductController.js"

// Instancia as estratégias de operação do banco de dados
let sqlite3UserSearchRepository = new SQLite3UserSearchRepository()
let sqlite3ProductManagementRepository = new SQLite3ProductManagementRepository()
let sqlite3LicenseManagementRepository = new SQLite3LicenseManagementRepository()

// Instancia serviços e controllers
let createProductService = new CreateProductService(sqlite3UserSearchRepository, sqlite3ProductManagementRepository, sqlite3LicenseManagementRepository)
let createProductController = new CreateProductController(createProductService)

export default createProductController
