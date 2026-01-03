import { v4 as uuidv4 } from "uuid"

import { Email, CreateEmail } from "@models/Email.js"

class User {
    public id: string
    public name: string
    public email: Email

    constructor(props: { id?: string, name: string, email: Email }) {
        this.id = props.id ?? uuidv4()
        this.name = props.name
        this.email = props.email
    }
}

export { User }
