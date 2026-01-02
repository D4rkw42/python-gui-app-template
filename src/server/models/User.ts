import { v4 as uuidv4 } from "uuid"

import { Email, CreateEmail } from "@server/models/Email.js"

class User {
    public id: string
    public name: string
    public email: Email

    constructor(id: string, name: string, email: Email) {
        this.id = id
        this.name = name
        this.email = email
    }
}

async function CreateUser(props: { id?: string, name: string, email: string }): Promise<User> {
    try {
        let userId = props.id ?? uuidv4()
        let userEmail = props.id? new Email(props.email) : await CreateEmail(props.email)

        return new User(userId, props.name, userEmail)
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Unable to create user`, { cause: err.message })
        }

        throw new Error("Unable to create user by reason: unexpected error")
    }
}

export { User, CreateUser }
