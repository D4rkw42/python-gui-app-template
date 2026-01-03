// Controlador de rota do serviço ListAllUsers

import { Request, Response } from "express"
import * as z from "zod"

import { User } from "@models/User.js"
import ListAllUsersService from "@services/ListAllUsers/ListAllUsersService.js"

// Request interface

// Request
type ListAllUsersRequest = Request<
    Record<string | number, never>,
    any,
    Record<string | number, never>,
    IListAllUsersQuery
>;

// Request Body
interface IListAllUsersQuery {
    startAt?: number
    limit?: number
}

class ListAllUsersController {
    private listAllUsersService: ListAllUsersService

    constructor(listAllUsersService: ListAllUsersService) {
        this.listAllUsersService = listAllUsersService
    }

    handle(req: ListAllUsersRequest, res: Response) {
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

        // Obtém todos os usuários
        let users = this.listAllUsersService.load(constrains.data.startAt, constrains.data.limit)

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

export default ListAllUsersController
export type { ListAllUsersRequest }
