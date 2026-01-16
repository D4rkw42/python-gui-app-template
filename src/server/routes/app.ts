import { Router, Request, Response } from "express"

const AppRouter = Router()

// Sem página inicial
AppRouter.get("/", async (req: Request, res: Response) => {
    res.status(404).send()
})

export default AppRouter
