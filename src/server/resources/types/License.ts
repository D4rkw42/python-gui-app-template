// Definições gerais e regras de Licença

import ILicenseSecrets from "@resources/interfaces/ILicenseSecrets.js"

/**
 * License Constructor
 */
interface ILicenseConstructorProps {
    productbuildID: string
    productKey: string
    secrets: ILicenseSecrets
    salt: string
}

/**
 * Representa uma Licença para um Produto específico
 */
class License {
    public productbuildID: string

    public productKey: string
    public secrets: ILicenseSecrets

    public salt: string

    constructor(props: ILicenseConstructorProps) {
        this.productbuildID = props.productbuildID
        this.productKey = props.productKey
        this.secrets = props.secrets
        this.salt = props.salt
    }
}

export default License
