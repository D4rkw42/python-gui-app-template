import { Router, Request, Response } from "express"

import { CreateUserRequest } from "@services/CreateUser/CreateUserController.js"
import { ListUsersRequest } from "@services/ListUsers/ListUsersController.js"

import { createUserController } from "@services/CreateUser/index.js"
import { listUsersController } from "@services/ListUsers/index.js"

const AdminRouter = Router()

// Sem página padrão
AdminRouter.get("/", async (req: Request, res: Response) => {
    res.status(404).send()
})

// Listagem de todos os usuários
AdminRouter.get("/users", (req: ListUsersRequest, res: Response) => {
    listUsersController.handle(req, res)
})

// Criação de novos usuários
AdminRouter.post("/users/new", (req: CreateUserRequest, res: Response) => {
    createUserController.handle(req, res)
})

export default AdminRouter
