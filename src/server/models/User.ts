import { v4 as uuidv4 } from "uuid"

class User {
    public id: string
    public name: string
    public email: string

    constructor(props: { id?: string, name: string, email: string }) {
        this.id = props.id ?? uuidv4()
        this.name = props.name
        this.email = props.email
    }
}

export { User }
