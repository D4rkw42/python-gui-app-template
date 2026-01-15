// Definições de validação de licenças

import * as crypto from "node:crypto"

/**
 * Detalhes passados para verificação da chave do produto
 */
interface IProductKeyValidationDetails {
   algorithm: string
   format: crypto.BinaryToTextEncoding
}

/**
 * Determina as funções relacionadas a validação de licenças
 */
class LicenseValidation {
    /**
     * Valida a chave do produto.
     * 
     * @param productKey ``string`` Chave a ser analisada.
     * @param salt ``salt`` Salt da chave verdadeira.
     * @param signature ``string`` Hash original da chave verdadeira.
     * @param details ``IProductKeyValidationDetails`` Detalhes de formatação de hash da chave verdadeira.
     * @returns ``true`` Se a chave for válida ou ``false`` se não for.
     */ 
    static ValidateProductKey(productKey: string, salt: string, signature: string, details: IProductKeyValidationDetails): boolean {
        return signature === crypto.createHash(details.algorithm).update(productKey + salt).digest(details.format)
    }

    /**
     * Verifica o payload assinado digitalmente pela chave privada.
     * 
     * @param payload ``string`` (JSON Format) String que representa o payload no formado JSON.
     * @param signature ``string`` O hash do payload original.
     * @param publicKey ``string`` A chave privada no formato válido.
     * @returns ``boolean`` Se o payload é válido para determina assinatura.
     * @throws ``SyntaxError`` Se o payload não estiver no formato JSON.
     * @throws ``Error`` Se a chave pública for inválida.
     */
    static ValidatePayloadSignature(payload: string, signature: string, publicKey: string): boolean {
        // Verifica se o payload é válido
        try {
            JSON.parse(payload)
        } catch {
            throw new SyntaxError("Formato do payload inválido (JSON).")
        }

        // Verifica se a chave pública é válida
        try {
            crypto.createPublicKey(publicKey)
        } catch {
            throw new Error("Chave pública inválida ou corrompida.")
        }

        return crypto.verify("ed25519", Buffer.from(payload), publicKey, Buffer.from(signature))
    }
}

export default LicenseValidation
