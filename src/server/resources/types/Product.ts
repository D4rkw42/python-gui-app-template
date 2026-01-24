// Definições gerais e regras de Produto

import { GenerateHexadecimalStr } from "@utils/math/numeric/Hexadecimal.js"

/**
 * Product Constructor
 */
interface IProductConstructorProps {
    buildID?: string
    ownerId: string
    projectName: string
    installID?: string
    fingerprint?: string
    isActivated?: boolean
}

/**
 * Representa os produtos vendidos a clientes
 */
class Product {
    public buildID: string
    public ownerId: string
    public projectName: string
    public installID: string
    public fingerprint: string
    public isActivated: boolean
    
    constructor(props: IProductConstructorProps) {
        this.buildID = props.buildID ?? Product.GenerateProductId(true) // ID gerado automaticamente na primeira criação
        this.ownerId = props.ownerId

        this.projectName = props.projectName

        // Valor padrão definido no banco de dados. Gerado client-side quando o produto é ativado.
        if (props.installID !== undefined) {
            this.installID = props.installID
        }

        // Valor padrão definido no banco de dados. Gerado client-side quando o produto é ativado
        if (props.fingerprint !== undefined) {
            this.fingerprint = props.fingerprint
        }

        // Valor padrão definido no banco de dados. False por padrão; torna-se true quando o produto é ativado com sucesso
        if (props.isActivated !== undefined) {
            this.isActivated = props.isActivated
        }
    }

    /**
     * Regra de geração de Product ids
     * 
     * @returns Um código hexadecimal que representa 
     */
    static GenerateProductId(isBuildType: boolean = false): string {
        return "00" + GenerateHexadecimalStr(8) + (isBuildType? ".build" : "")
    }
}

export default Product
