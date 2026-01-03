import { Request, Response } from "express"

import { CreateEmail } from "@models/Email.js"
import CreateUserService from "@services/CreateUser/CreateUserService.js"
import ServerError from "@utils/ServerError.js"

// Request interface

// Request
type CreateUserRequest = Request<
    Record<string | number, never>,
    any,
    ICreateUserRequestBody,
    Record<string | number, never>
>;

// Request Body
interface ICreateUserRequestBody {
    name?: string
    email?: string
}

// Controller de requisições do serviço CreateUser
class CreateUserController {
    private createUserService: CreateUserService

    constructor(createUserService: CreateUserService) {
        this.createUserService = createUserService
    }

    async handle(req: CreateUserRequest, res: Response) {
        let name = req.body.name
        let email = req.body.email

        // validação de dados vazios
        if (!(name && email)) {
            return res.status(400).json({ message: "Missing data on request." }).send() // Bad Request  
        }

        // validação de dados inconsistentes
        if (typeof name !== "string" || typeof email !== "string") {
            return res.status(400).json({ message: "Name and E-mail must be string." }).send() // Bad Request
        }

        // validação de e-mail
        let validEmail

        // tentativa de criação de e-mail
        try {
            validEmail = await CreateEmail(email)
        } catch (err: unknown) {
            if (err instanceof ServerError) {
                // e-mail criado não está no formato válido
                return res.status(400).json({ message: err.UserMessage }).send() // Bad Request
            }

            return res.status(500).json({ message: "Unexpected error." }).send() // Internal Server Error
        }

        try {
            // criação do usuário
            let success = await this.createUserService.load({ name: name, email: validEmail })

            if (success) {
                return res.status(201).json({ message: "User created successfully." }).send() // Created
            }

            // Banco de dados não conseguiu salvar o usuário
            return res.status(500).json({ message: "It was not possible to create user: unexpected error." }).send()
        } catch (err: unknown) {
            if (err instanceof ServerError) {
                // Possíveis erros: usuário já existe
                return res.status(400).json({ message: err.UserMessage }).send() // Bad Request
            }

            return res.status(500).json({ message: "Unexpected error." }).send() // Internal Server Error
        }
    }
}

export default CreateUserController
export type { CreateUserRequest }
