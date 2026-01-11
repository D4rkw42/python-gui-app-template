// Definições gerais e regras de Usuário

import { v4 as uuidv4 } from "uuid"

/**
 * User Constructor
 */
interface IUserConstructorProps {
    id?: string
    name: string
    email: string
}

/**
 * Representa os usuários da aplicação
 */
class User {
    public id: string
    public name: string
    public email: string

    constructor(props: IUserConstructorProps) {
        // ID gerado automaticamente na primeira criação
        this.id = props.id ?? uuidv4()
        
        this.name = props.name
        this.email = props.email
    }
}

export default User
