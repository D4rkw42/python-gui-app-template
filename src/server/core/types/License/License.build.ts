// Funções auxiliares para construção de Licensas

import * as crypto from "node:crypto"

/**
 * Classe builder para informações da Licença
 */
class LicenseBuilder {
    /**
     * Gera uma chave de produto aleatória.
     * 
     * @param details Especificações da formatação da chave: ``segments`` (``Array<number>``) - bytes por separação, ``separator`` (``string``) - string do separador, ``productKeyFormat`` (``BufferEnconding``) - formato da chave gerada, ``signatureFormat`` (``crypto.BinaryToTextEncoding``) - formato do hash gerado a partir da chave do produto.
     * @returns ``{ productKey: string, signature: string }`` A chave do produto e sua versão com hash.
     */
    static GenerateProductKey(details: { bytes: Array<number>, separator: string, productKeyFormat: BufferEncoding, signatureFormat: crypto.BinaryToTextEncoding }) {
        let raw = ""
 
        for (let i = 0; i < details.bytes.length; ++i) {
            // Gera caracteres aleatórios de criptografia no formato desejado
            let byte = Math.ceil(details.bytes[i]!)

            if (byte < 1) {
                throw new Error("Bytes must be equals 1 or greater.")
            }

            raw += crypto.randomBytes(byte).toString(details.productKeyFormat)

            // Inserção de separadores  
            if (i !== details.bytes.length - 1) {
                raw += details.separator
            }
        }

        // Hash da chave do produto
        let signature = crypto.createHash("sha256").update(raw).digest(details.signatureFormat)

        return { raw, signature }
    }

    /**
     * Gera um par de chaves de criptografia para assinatura assimétrica.
     * 
     * @returns ``{ publicKey: string, privateKey: string }`` As chaves pública e privada.
     */
    static GenerateSecretKeysPair() {
        // Gera par de chaves pública e privada (algoritmo ed25519)
        let { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519")

        // Export as chaves para texto legível e armazenável
        let publicKeyExported = publicKey.export({
            type: "spki",
            format: "pem"
        })

        let privateKeyExported = privateKey.export({
            type: "pkcs8",
            format: "pem"
        })

        // Retorna convertido para base64
        return { 
            publicKey: publicKeyExported as string,
            privateKey: privateKeyExported as string
         }
    }

    /**
     * Gera um salt aleatório.
     * 
     * @returns ``string`` O salt aleatório.
     */
    static GenerateRandomSalt(format: BufferEncoding, bytes: number): string {
        return crypto.randomBytes(bytes).toString(format)
    }
}

export default LicenseBuilder
