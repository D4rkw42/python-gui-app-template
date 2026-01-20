// Definições do serviço "ActivateApp"

import sqlite3db from "@database/db/sqlite3/db.js"

import { SQLite3UserSearchRepository } from "@repository/implementations/sqlite3/UserImpl.js"
import { SQLite3ProductSearchRepository, SQLite3ProductManagementRepository } from "@repository/implementations/sqlite3/ProductImpls.js"
import { SQLite3LicenseSearchRepository } from "@repository/implementations/sqlite3/LicenseImpls.js"
import { SQLite3PayloadSearchRepository, SQLite3PayloadManagementRepository } from "@repository/implementations/sqlite3/PayloadImpls.js"

import ActivateAppService from "@services/ActivateApp/ActivateAppService.js"
import ActivateAppController from "@services/ActivateApp/ActivateAppController.js"
import TransactionManager from "@database/TransactionManager.js"

let sqlite3UserSearchRepository = new SQLite3UserSearchRepository()
let sqlite3ProductSearchRepository = new SQLite3ProductSearchRepository()
let sqlite3ProductManagementRepository = new SQLite3ProductManagementRepository()
let sqlite3LicenseSearchRepository = new SQLite3LicenseSearchRepository()
let sqlite3PayloadSearchRepository = new SQLite3PayloadSearchRepository()
let sqlite3PayloadManagementRepository = new SQLite3PayloadManagementRepository()

let sqlite3TransactionManager = new TransactionManager(sqlite3db.Transaction)

let activateAppService = new ActivateAppService(
    sqlite3UserSearchRepository,
    sqlite3ProductSearchRepository,
    sqlite3ProductManagementRepository,
    sqlite3LicenseSearchRepository,
    sqlite3PayloadSearchRepository,
    sqlite3PayloadManagementRepository,
    sqlite3TransactionManager
)

let activateAppController = new ActivateAppController(activateAppService)

export default activateAppController
