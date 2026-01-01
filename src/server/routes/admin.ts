import Router from "express"

const AdminRouter = Router()

AdminRouter.get("/", (req, res) => {
    res.status(200).send("/Admin")
})

export default AdminRouter
