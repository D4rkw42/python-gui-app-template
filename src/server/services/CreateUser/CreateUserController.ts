// Controlador de rota do serviço CreateUser

import { Request, Response } from "express"
import * as z from "zod"

import CreateUserService, { CreateServiceException } from "@services/CreateUser/CreateUserService.js"
import ServerError from "@utils/Exception/ServerError.js"

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

    handle(req: CreateUserRequest, res: Response) {
        let name = req.body.name
        let email = req.body.email

        // Descrição do estado ideal das entradas
        let userSchema = z.object({
            name: z.string("Apenas texto é permitido.")
                .min(3, "O nome deve ter pelo menos 3 caracteres.")
                .max(15, "O nome não pode ultrapassar 15 caracteres."),
            email: z.email("Formato de e-mail inválido.")
        })

        // Verificação dos dados de entrada
        let user = userSchema.safeParse({ name, email })

         // Formado dos dados inválido // Bad Request
        if (!user.success) {
            return res.status(400).json({
                message: "Dados inválidos.",
                description: user.error.issues
            })
        }

        try {
            // Criação de usuário
            this.createUserService.load(user.data)

            // Usuário criado com sucesso // Created
            return res.status(201).json({ message: "Usuário criado com sucesso." })
        } catch (err) {
            // Erros de operação do servidor
            if (err instanceof ServerError) {
                switch (err.exception) {
                    case CreateServiceException.EmailAlreadyRegistered:
                        // E-mail já registrado // Bad Request
                        return res.status(400).json({ message: err.UserMessage })

                    case CreateServiceException.UnexpectedError:
                         // Erro inesperado // Internal Server Error
                        return res.status(500).json({ message: err.UserMessage })
                }
            }

            // Erro inesperado // Internal Server Error
            return res.status(500).json({ message: "Erro inesperado." })
        }
    }
}

export default CreateUserController
export type { CreateUserRequest }
