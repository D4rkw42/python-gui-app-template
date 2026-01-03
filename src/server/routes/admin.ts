import { Router, Request, Response } from "express"

import { CreateUserRequest } from "@services/CreateUser/CreateUserController.js"
import { ListAllUsersRequest } from "@services/ListAllUsers/ListAllUsersController.js"

import { createUserController } from "@services/CreateUser/index.js"
import { listAllUsersController } from "@services/ListAllUsers/index.js"

const AdminRouter = Router()

// Sem página padrão
AdminRouter.get("/", async (req: Request, res: Response) => {
    res.status(404).send()
})

// Listagem de todos os usuários
AdminRouter.get("/users", (req: ListAllUsersRequest, res: Response) => {
    listAllUsersController.handle(req, res)
})

// Criação de novos usuários
AdminRouter.post("/users/new", (req: CreateUserRequest, res: Response) => {
    createUserController.handle(req, res)
})

export default AdminRouter
