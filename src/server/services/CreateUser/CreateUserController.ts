// Controlador de rota do serviço "CreateUser"

import { Request, Response } from "express"
import * as z from "zod"

import CreateUserService, { CreateUserServiceException } from "@services/CreateUser/CreateUserService.js"
import ServerError from "@utils/Exception/ServerException.js"

import Logger from "@utils/Logger.js"

// Request interface

/**
 * Configurações do Request HTTP para o serviço CreateUser
 */
type CreateUserRequest = Request<
    Record<string, never>,
    any,
    ICreateUserRequestBody,
    Record<string, never>
>

/**
 * Configurações do body HTTP para o serviço CreateUser
 */
interface ICreateUserRequestBody {
    name?: string
    email?: string
}

/**
 * Controller de requisições do serviço CreateUser
 */
class CreateUserController {
    private createUserService: CreateUserService

    constructor(createUserService: CreateUserService) {
        this.createUserService = createUserService
    }

    /**
     * Controla as requisições HTTP do endpoint HTTP do serviço ``CreateUser``
     * 
     * @param req ``CreateUserRequest`` Request template originado da biblioteca ``express.js``
     * @param res ``Response`` Response originado da biblioteca ``express.js``
     */
    handle(req: CreateUserRequest, res: Response) {
        // loggers
        const errorLogger = new Logger(process.env.ERROR_LOG_FILE ?? ".log.txt")
        const operationLogger = new Logger(process.env.OPERATION_LOG_FILE ?? ".log.txt")

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

            operationLogger.EmitLog({
                origin: "HTTP:CreateUser",
                content: `Novo usuário "${user.data.name}" cadastrado com o seguinte e-mail: ${user.data.email}.`
            })

            // Usuário criado com sucesso // Created
            return res.status(201).json({ message: "Usuário criado com sucesso." })
        } catch (err) {
            // Erros de operação do servidor
            if (err instanceof ServerError) {
                switch (err.exception) {
                    case CreateUserServiceException.EmailAlreadyRegistered:
                        // E-mail já registrado // Conflict
                        return res.status(409).json({ message: err.Formated })

                    case CreateUserServiceException.UnexpectedError:
                         // Erro inesperado // Internal Server Error
                        return res.status(500).json({ message: err.Formated })
                }
            }

            if (err instanceof Error) {
                errorLogger.EmitLog({ 
                    content: err.message + (err.cause? `. Cause: ${err.cause}` : ""),
                    origin: "HTTP:CreateUser",
                    exception: err.name
                 })
            }

            // Erro inesperado // Internal Server Error
            return res.status(500).json({ message: "Erro inesperado." })
        }
    }
}

export default CreateUserController
export type { CreateUserRequest }
