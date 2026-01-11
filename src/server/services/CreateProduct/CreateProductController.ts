import { Request, Response } from "express"
import z from "zod"

import CreateProductService, { CreateProductServiceException } from "@services/CreateProduct/CreateProductService.js"
import ServerException from "@utils/Exception/ServerException.js"

import Logger from "@utils/Logger.js"

// logger
const logger = new Logger(process.env.MAIN_LOG_FILE ?? ".log.txt")

/**
 * Request do serviço "CreateProduct"
 */
type CreateProductRequest = Request<
    Record<string, never>,
    any,
    ICreateProductBody,
    Record<string, never>
>

/**
 * Body do serviço "CreateProduct"
 */
interface ICreateProductBody {
    userEmail: string
}

/**
 * Controlador de requisições HTTP do serviço "CreateProduct"
 */
class CreateProductController {
    private createProductService: CreateProductService

    constructor(createProductService: CreateProductService) {
        this.createProductService = createProductService
    }

    /**
     * Controla as requisições HTTP do endpoint HTTP do serviço "CreateProduct"
     * 
     * @param req ``CreateProductRequest`` Request template originado da biblioteca ``express.js``
     * @param res Response originado da biblioteca ``express.js``
     */
    handle(req: CreateProductRequest, res: Response) {
        let userInfoSchema = z.object({
            userEmail: z.email("Endereço de e-mail inválido.")
        })

        let userInfo = userInfoSchema.safeParse({ userEmail: req.body.userEmail })

        // Dados inválidos // Bad Request  
        if (!userInfo.success) {
            return res.status(400).json({
                message: "Dados inválidos",
                description: userInfo.error.issues
            })
        }

        try {
            let result = this.createProductService.load({ userEmail: userInfo.data.userEmail })

            // Produto criado com sucesso // Created
            return res.status(201).json({
                message: "Produto criado com sucesso.",
                data: result.export
            })
        } catch (err: unknown) {
            if (err instanceof ServerException) {
                switch (err.exception) {
                    // E-mail não registrado // Bad Request
                    case CreateProductServiceException.EmailNotRegistered:
                        return res.status(400).json({ message: err.Formated })

                    // Usuário não pôde ser salvo no banco de dados // Internal Server Error
                    case CreateProductServiceException.UnexpectedError:
                        return res.status(500).json({ message: err.Formated })
                }
            }

            if (err instanceof Error) {
                logger.EmitLog({ 
                    content: err.message + (err.cause? `. Cause: ${err.cause}` : ""),
                    origin: "HTTP:CreateProduct",
                    exception: err.name
                 })
            }

            return res.status(500).json({ message: "Erro inesperado." }) // Internal Server Error
        }
    }
}

export default CreateProductController
export type { CreateProductRequest }
