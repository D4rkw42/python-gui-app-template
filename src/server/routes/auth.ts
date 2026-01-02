import Router from "express"

const AuthRouter = Router()

AuthRouter.get("/", async (req, res) => {
    res.status(200).send("/Auth")
})

export default AuthRouter
