import { Router, Request, Response } from "express"

import { CreateUserRequest } from "@services/CreateUser/CreateUserController.js"
import { ListUsersRequest } from "@services/ListUsers/ListUsersController.js"
import { CreateProductRequest } from "@services/CreateProduct/CreateProductController.js"

import createUserController from "@services/CreateUser/index.js"
import listUsersController from "@services/ListUsers/index.js"
import createProductController from "@services/CreateProduct/index.js"

const AdminRouter = Router()

// Sem página padrão
AdminRouter.get("/", async (req: Request, res: Response) => {
    res.status(404).send()
})

// Usuários

// Listagem de todos os usuários
AdminRouter.get("/users", async (req: ListUsersRequest, res: Response) => {
    listUsersController.handle(req, res)
})

// Criação de novos usuários
AdminRouter.post("/users/new", async (req: CreateUserRequest, res: Response) => {
    createUserController.handle(req, res)
})

// Produtos

// Criação de novos produtos
AdminRouter.post("/products/new", async (req: CreateProductRequest, res :Response) => {
    createProductController.handle(req, res)
})

export default AdminRouter
