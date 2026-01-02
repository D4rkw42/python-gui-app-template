// Registro de Chave de Acesso ao Aplicativo Python
interface AuthInfo {
    onwerId: string // o id do usuário
    uniqueAppId: string // o id único de identificação criptografado do aplicativo

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
    authkey: string

    activated: boolean // se a chave já foi ativada
}

export default AuthInfo
