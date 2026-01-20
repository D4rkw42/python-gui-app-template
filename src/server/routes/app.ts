import { Router, Request, Response } from "express"

import activateAppController from "@services/ActivateApp/index.js"
import { ActivateAppRequest } from "@services/ActivateApp/ActivateAppController.js"

const AppRouter = Router()

// Sem página inicial
AppRouter.get("/", async (req: Request, res: Response) => {
    res.status(404).send()
})

// Ativação da licença dos produtos
AppRouter.post("/activate", async (req: ActivateAppRequest, res: Response) => {
    activateAppController.handle(req, res)
})

export default AppRouter
