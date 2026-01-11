// Definições gerais e regras de Licença

import ILicenseSecrets from "@resources/interfaces/ILicenseSecrets.js"

/**
 * License Constructor
 */
interface ILicenseConstructorProps {
    productBuildId: string
    productKey: string
    secrets: ILicenseSecrets
    salt: string
}

/**
 * Representa uma Licença para um Produto específico
 */
class License {
    public productBuildId: string

    public productKey: string
    public secrets: ILicenseSecrets

    public salt: string

    constructor(props: ILicenseConstructorProps) {
        this.productBuildId = props.productBuildId
        this.productKey = props.productKey
        this.secrets = props.secrets
        this.salt = props.salt
    }
}

export default License
