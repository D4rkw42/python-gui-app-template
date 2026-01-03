import { Router, Request, Response } from "express"

import { CreateUserRequest } from "@services/CreateUser/CreateUserController.js"
import { createUserController } from "@services/CreateUser/index.js"

const AdminRouter = Router()

// Sem página padrão
AdminRouter.get("/", async (req: Request, res: Response) => {
    res.status(404).send()
})

// Criação de novos usuários
AdminRouter.post("/users/new", async (req: CreateUserRequest, res: Response) => {
    await createUserController.handle(req, res)
})

export default AdminRouter
