import app from "@server/app.js"

const PORT = 3000

// configura .env local caso em modo de desenvolvimento
if (process.env.NODE_ENV !== "production") {
    const dotenv = await import("dotenv")
    dotenv.config()
}

app.listen(process.env.PORT ?? PORT, () => console.log("Listening on port", PORT))
