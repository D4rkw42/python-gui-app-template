// Função auxiliar para abrir configurações

import Json from "@utils/Json.js"

/**
 * Abre um arquivo de configuração.
 * 
 * @param config O path + nome do arquivo de configuração na pasta de configurações.
 * @returns ``JSON`` Um objeto JSON para a configuração.
 * @throws ``Error`` Caso o arquivo encontrado não exista ou seja inválido para o formato Json.
 */
function OpenJsonConfig(config: string): any {
    let configDir = process.env.CONFIG_DIR

    // Verificação de configuração de ambiente
    if (configDir === undefined) {
        throw new Error("Missing environment configuration for config dir.")
    }

    if (configDir === "") {
        throw new Error("Invalid environment configuration for config dir.")
    }

    // Objeto Json primário
    let json

    // Extração do conteúdo do arquivo Json
    try {
        json = new Json(configDir + config)
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error("Can't open config file.", { cause: err.message })
        }
    }

    return json!.Read
}

export { OpenJsonConfig }
