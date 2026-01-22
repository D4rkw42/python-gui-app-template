import { Request, Response } from "express"
import z from "zod"

import CreateProductService, { CreateProductServiceException } from "@services/CreateProduct/CreateProductService.js"
import ServerException from "@utils/Exception/ServerException.js"

import Logger from "@utils/Logger.js"

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
    userEmail: string,
    projectName: string
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
        // loggers
        const errorLogger = new Logger(process.env.ERROR_LOG_FILE ?? ".log.txt")
        const operationLogger = new Logger(process.env.OPERATION_LOG_FILE ?? ".log.txt")

        let userEmail = req.body.userEmail
        let projectName = req.body.projectName

        let userInfoSchema = z.object({
            userEmail: z.email("Endereço de e-mail inválido."),
            projectName: z.string("Apenas texto é permitido.")
                .min(8, "Tamanho mínimo de 8 caracteres.")
                .max(35, "Tamanho máximo excedido: 35 caracteres.")
        })

        // Verificação da validade dos dados
        let userInfo = userInfoSchema.safeParse({ userEmail, projectName })

        // Dados inválidos // Bad Request  
        if (!userInfo.success) {
            return res.status(400).json({
                message: "Dados inválidos.",
                description: userInfo.error.issues
            })
        }

        try {
            let result = this.createProductService.load({ userEmail: userInfo.data.userEmail, projectName: userInfo.data.projectName })

            operationLogger.EmitLog({
                origin: "HTTP:CreateProduct",
                content: `Novo produto criado com o id "${result.export.product.buildID}".`
            })

            // Produto criado com sucesso // Created
            return res.status(201).json({
                message: "Produto criado com sucesso.",
                data: result.export
            })
        } catch (err: unknown) {
            if (err instanceof ServerException) {
                switch (err.exception) {
                    // E-mail não registrado (usuário não existe) // Not Found
                    case CreateProductServiceException.EmailNotRegistered:
                        return res.status(404).json({ message: err.Formated })

                    // Usuário não pôde ser salvo no banco de dados // Internal Server Error
                    case CreateProductServiceException.UnexpectedError:
                        return res.status(500).json({ message: err.Formated })
                }
            }

            if (err instanceof Error) {
                errorLogger.EmitLog({ 
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
