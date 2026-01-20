import { Request, Response } from "express"
import z from "zod"

import ActivateAppService, { ActivateAppServiceException } from "@services/ActivateApp/ActivateAppService.js"
import ServerException from "@utils/Exception/ServerException.js"

import Logger from "@utils/Logger.js"

/**
 * Request do serviço "CreateProduct"
 */
type ActivateAppRequest = Request<
    Record<string, never>,
    any,
    IActivateAppBody,
    Record<string, never>
>

/**
 * Body do serviço "CreateProduct"
 */
interface IActivateAppBody {
    activate?: {
        userEmail: string
        productKey: string
    }

    buildId: string
    installId: string
    fingerprint: string
}

/**
 * Controlador de requisições HTTP do serviço "CreateProduct"
 */
class ActivateAppController {
    private activateAppService: ActivateAppService

    constructor(activateAppService: ActivateAppService) {
        this.activateAppService = activateAppService
    }

    /**
     * Controla as requisições HTTP do endpoint HTTP do serviço "CreateProduct"
     * 
     * @param req ``CreateProductRequest`` Request template originado da biblioteca ``express.js``
     * @param res Response originado da biblioteca ``express.js``
     */
    handle(req: ActivateAppRequest, res: Response) {
        // loggers
        const errorLogger = new Logger(process.env.ERROR_LOG_FILE ?? ".log.txt")
        const operationLogger = new Logger(process.env.OPERATION_LOG_FILE ?? ".log.txt")

        let userEmail = req.body.activate?.userEmail
        let productKey = req.body.activate?.productKey
        let buildId = req.body.buildId
        let installId = req.body.installId
        let fingerprint = req.body.fingerprint

        // Validação de dados
        let activationSchema = z.object({
            userEmail: z.email("E-mail inválido."),
            productKey: z.string("O valor fornecido é inválido"),
            buildId: z.string("Valor inválido."),
            installId: z.string("Valor inválido."),
            fingerprint: z.string("Valor inválido.")
        })

        let activation = activationSchema.safeParse({ userEmail, productKey, buildId, installId, fingerprint })

        // Dados inválidos // Bad Request  
        if (!activation.success) {
            return res.status(400).json({
                message: "Dados inválidos.",
                description: activation.error.issues
            })
        }

        try {
            let data = this.activateAppService.load({
                userEmail: activation.data.userEmail,
                productKey: activation.data.productKey,
                buildId: activation.data.buildId,
                installId: activation.data.installId,
                fingerprint: activation.data.fingerprint
            })

            operationLogger.EmitLog({
                origin: "HTTP:ActivateApp",
                content: `Produto ${activation.data.buildId} ativado com sucesso com o id de instalação ${activation.data.installId}. Referido usuário: ${activation.data.userEmail}.`
            })

            // Produto ativado com sucesso // Ok
            return res.status(200).json({
                message: "Produto ativado com sucesso!",
                paylod: data.export.payload,
                token: data.export.token
            })
        } catch (err: unknown) {
            if (err instanceof ServerException) {
                switch (err.exception) {
                    // Usuário não existe // Not Found
                    case ActivateAppServiceException.UserNotRegistered:
                        return res.status(404).json({ message: err.Formated })

                    // Produto não existe ou não pertence ao usuário // Not Found
                    case ActivateAppServiceException.UserAndProductMismatch:
                        return res.status(404).json({ message: err.Formated })
                        
                    // Produto já ativo // Conflict
                    case ActivateAppServiceException.ProductAlreadyActivated:
                        return res.status(409).json({ message: err.Formated })

                    // Chave do produto inválida // Conflict
                    case ActivateAppServiceException.InvalidProductKey:
                        return res.status(409).json({ message: err.Formated })

                    // Instalação já existe ou é conhecida // Conflict
                    case ActivateAppServiceException.ProductInstallationAlreadyExists:
                        return res.status(409).json({ message: err.Formated })

                    // Erro inesperado // Internal Server Error
                    case ActivateAppServiceException.UnexpectedError:
                        return res.status(500).json({ message: err.Formated })
                }
            }

            if (err instanceof Error) {
                errorLogger.EmitLog({ 
                    content: err.message + (err.cause? `. Cause: ${err.cause}` : ""),
                    origin: "HTTP:ActivateApp",
                    exception: err.name
                 })
            }

            return res.status(500).json({ message: "Erro inesperado." }) // Internal Server Error
        }
    }
}

export default ActivateAppController
export type { ActivateAppRequest }
