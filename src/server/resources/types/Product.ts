import { v4 as uuidv4 } from "uuid"

/**
 * Representa os produtos vendidos a clientes
 */
class Product {
    public id: string // hash
    public isActivated: boolean
    
    constructor(props: { id?: string, isActivated?: boolean}) {
        // ID gerado automaticamente na primeira criação
        this.id = props.id ?? uuidv4()
        
        // Valor padrão definido no banco de dados. Valor salvo recuperado em toda instanciação.
        if (props.isActivated !== undefined) {
            this.isActivated = props.isActivated
        }
    }
}

export default Product
