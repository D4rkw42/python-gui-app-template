import { v4 as uuidv4 } from "uuid"

/**
 * Representa os usuários da aplicação
 */
class User {
    public id: string
    public name: string
    public email: string

    constructor(props: { id?: string, name: string, email: string }) {
        // ID gerado automaticamente na primeira criação
        this.id = props.id ?? uuidv4()
        
        this.name = props.name
        this.email = props.email
    }
}

export default User
