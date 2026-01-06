/**
 * Registro de Chave de Acesso ao Aplicativo Python
 */
class AuthInfo {
    public productId: string // o id único de identificação do aplicativo criptografado com hash

    /*
     * Chave de Autenticação o Aplicativo
     * Formado a partir do hash das seguintes informações
     * 
     *  * Product Key - chave do aplicativo, passada para o usuário
     *  * Name - nome do usuário
     *  * E-mail - e-mail do usuário
     *  * Unique App ID - identificador único de uma das cópias do aplicativo
     *  * Timestamp - um timestamp para validar o tempo de vida da chave
     * 
     */
    private authKey: string // hash
    public expiresAt: string // data de expiração da chave de autenticação
    
    constructor(props: { productId: string, authKey: string }) {
        this.productId = props.productId
        this.authKey = props.authKey
    }
}

export default AuthInfo
