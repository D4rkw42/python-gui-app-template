// Definições gerais e regras de Produto

import { GenerateHexadecimal } from "@utils/math/numeric/Hexadecimal.js"

/**
 * Product Constructor
 */
interface IProductConstructorProps {
    buildId?: string
    ownerId: string
    projectName: string
    installId?: string
    fingerprint?: string
    isActivated?: boolean
}

/**
 * Representa os produtos vendidos a clientes
 */
class Product {
    public buildId: string
    public ownerId: string
    public projectName: string
    public installId: string
    public fingerprint: string
    public isActivated: boolean
    
    constructor(props: IProductConstructorProps) {
        this.buildId = props.buildId ?? Product.GenerateProductId(true) // ID gerado automaticamente na primeira criação
        this.ownerId = props.ownerId

        this.projectName = props.projectName

        // Valor padrão definido no banco de dados. Gerado client-side quando o produto é ativado.
        if (props.installId !== undefined) {
            this.installId = props.installId
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
        return "00" + GenerateHexadecimal(8) + (isBuildType? ".build" : "")
    }
}

export default Product
