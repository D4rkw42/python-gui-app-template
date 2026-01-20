// Controlador de rota do serviço "ListAllUsers"

import { Request, Response } from "express"
import * as z from "zod"

import User from "@resources/types/User.js"
import ListUsersService from "@services/ListUsers/ListUsersService.js"

import Logger from "@utils/Logger.js"

// Request interface

/**
 * Configuração do Request para requisição do serviço ListUsers
 */
type ListUsersRequest = Request<
    Record<string, never>,
    any,
    Record<string, never>,
    IListUsersQuery
>

/**
 * Request Query para o serviço ListUsers
 */
interface IListUsersQuery {
    startAt?: number
    limit?: number
}

/**
 * Gerencia das requisições HTTP do serviço ``ListUsers``
 */
class ListUsersController {
    private listUsersService: ListUsersService

    constructor(listUsersService: ListUsersService) {
        this.listUsersService = listUsersService
    }

    /**
     * Controla as requisições HTTP do endpoint HTTP do serviço ``ListUsers``
     * 
     * @param req ``ListUsersRequest`` Request template originado da biblioteca ``express.js``
     * @param res ``Response`` Response originado da biblioteca ``express.js``
     */
    handle(req: ListUsersRequest, res: Response) {
        // loggers
        const errorLogger = new Logger(process.env.ERROR_LOG_FILE ?? ".log.txt")

        // Validação de dados
        let startAt = Number(req.query.startAt)
        let limit = Number(req.query.limit)

        // Esquema de validação
        let constrainsSchema = z.object({
            startAt: z.number('Espera-se um número.')
                .nonnegative('A informação não pode ser nagativa.'),
            limit: z.number('Espera-se um número.')
                .nonnegative('A informação não pode ser negativa.')
                .min(1, "Valor mínimo para requisição é 1.")
        })

        // Verificação de entrada
        let constrains = constrainsSchema.safeParse({ startAt, limit })

        // Dados recebidos são inválidos // Bad Request
        if (!constrains.success) {
            return res.status(400).json({
                message: "Dados inválidos.",
                description: constrains.error.issues
            })
        }

        // Remove a parte fracionária caso a requisição seja feita dessa forma
        constrains.data.startAt = Math.trunc(constrains.data.startAt)
        constrains.data.limit = Math.trunc(constrains.data.limit)

        // Obtém todos os usuários
        let data

        try {
            data = this.listUsersService.load({ startAt: constrains.data.startAt, limit: constrains.data.limit })
        } catch (err: unknown) {
            if (err instanceof Error) {
                errorLogger.EmitLog({ 
                    content: err.message + (err.cause? `. Cause: ${err.cause}` : ""),
                    origin: "HTTP:ListUsers",
                    exception: err.name
                 })
            }

            return res.status(500).json({ message: "Erro inesperado." }) // Internal Server Error
        }

        let users = data.export.users

        // Sem usuários registrados // Ok
        if (!users) {
            return res.status(200).json({
                startAt: constrains.data.startAt,
                limit: constrains.data.limit,
                usersFound: 0,

                message: `Nenhum usuário encontrado para essa requisição.`
            })
        }

        // Retorna todos os usuários // Ok
        return res.status(200).json({
            startAt: constrains.data.startAt,
            limit: constrains.data.limit,
            usersFound: users.length,

            // Apenas os nomes e e-mails são expostos
            users: users.map((user: User) => {
                return { name: user.name, email: user.email }
            })
        })
    }
}

export default ListUsersController
export type { ListUsersRequest }
