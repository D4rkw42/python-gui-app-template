// Definições gerais de Payloads e Tokens manipulados pelo servidor

import * as crypto from "node:crypto"

import { OpenJsonConfig } from "@utils/Config.js"
import { DateTime } from "luxon"

/**
 * Representação do payload retornado pelo servidor
 */
interface IPayload {
    installId: string
    mode: PayloadMode
    launchedAt: string
    expiresAt: string
    algorithm: string
    encoding: BufferEncoding
}

/** Modo de funcionamento do payload. */
type PayloadMode = "online" | "offline"

/**
 * Formato de dia e hora dos timestamps
 */
const PAYLOAD_TIMESTAMP_FORMAT = "FFFF"

/**
 * Propriedades para criação do Payload
 */
interface ICreatePayloadProps {
    installId: string
    mode: PayloadMode
}

/** Algoritmos que precisam de null nas funções de hash */
const NULL_METHOD_ALGORITHMS = ["ed25519", "ed448", "ml-dsa"]

/**
 * Cria um payload com base nas informações passadas
 * 
 * @param props ``ICreatePayloadProps`` Propriedades necessárias: ``installId`` (``string``) - id de instalação do produto, ``mode`` - modo de licenciamento.
 * @return ``IPayload``
 */
function CreatePayload(props: ICreatePayloadProps): IPayload {
    let payload: any = {
        installId: props.installId,
        mode: props.mode
    }

    let config = OpenJsonConfig("config.json")
    let payloadConfig = OpenJsonConfig("services/payload.json")

    let launch = DateTime.local().setLocale(payloadConfig.timestamp.locale as string).setZone(config.timezone as string)
    let expire = launch.plus({ days: payloadConfig.duration.days as number })

    payload.launchedAt = launch.toFormat(PAYLOAD_TIMESTAMP_FORMAT)
    payload.expiresAt = expire.toFormat(PAYLOAD_TIMESTAMP_FORMAT)

    payload.algorithm = payloadConfig.algorithm as string
    payload.encoding = payloadConfig.encoding as BufferEncoding

    return payload as IPayload
}

/**
 * Normaliza payloads para manter sempre o mesmo formato.
 * 
 * @param payload ``IPayload`` Payload a ser normalizado.
 * @return ``IPayload`` Payload normalizado.
 */
function NormalizePayloadShape(payload: IPayload): IPayload {
    return {
        installId: payload.installId,
        mode: payload.mode,
        launchedAt: payload.launchedAt,
        expiresAt: payload.expiresAt,
        algorithm: payload.algorithm,
        encoding: payload.encoding
    }
}

//

/**
 * Gera um token hash do Payload
 * 
 * @param payload
 */
function GeneratePayloadToken(payload: IPayload, privateKey: string): string {
    payload = NormalizePayloadShape(payload)

    let content = JSON.stringify(payload)

    try {
        crypto.createPrivateKey(privateKey)
    } catch {
        throw new Error("Chave privada inválida.")
    }

    let algorithm = NULL_METHOD_ALGORITHMS.includes(payload.algorithm as string)? null : payload.algorithm

    let token

    try {
        token = crypto.sign(algorithm, Buffer.from(content), privateKey)
    } catch {
        throw new Error("Chaves e algorítmo são incompatíveis.")
    }

    return token.toString(payload.encoding)
}

/**
 * Verifica se um payload é válido para determinado token
 * 
 * @param payload ``IPayload`` Payload a ser analisado.
 * @param token ``string`` Token do payload verdadeiro.
 * @param publicKey ``string`` A chave pública para análise.
 * @returns ``boolean`` Se o payload é válido.
 */
function ValidatePayload(payload: IPayload, token: string, publicKey: string): boolean {
    payload = NormalizePayloadShape(payload)

    let content = JSON.stringify(payload)

    try {
        crypto.createPublicKey(publicKey)
    } catch {
        throw new Error("Chave pública inválida.")
    }

    let algorithm = NULL_METHOD_ALGORITHMS.includes(payload.algorithm as string)? null : payload.algorithm

    try {
        return crypto.verify(algorithm, Buffer.from(content), publicKey, Buffer.from(token, payload.encoding))
    } catch {
        throw new Error("Chaves e algoritmo são incompatíveis.")
    }
}

export type { IPayload }
export { CreatePayload, GeneratePayloadToken, ValidatePayload }
