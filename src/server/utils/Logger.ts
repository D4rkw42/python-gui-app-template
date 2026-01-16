import fs from "node:fs"
import { DateTime } from "luxon"

import { OpenJsonConfig } from "@utils/Config.js"

/**
 * Dados passados para emissão de logs
 */
interface ILoggerInfo {
    origin?: string
    exception?: string
    content: string
}

/**
 * Representa um log salvo em arquivo e emitido no console do servidor.
 */
class Logger {
    private target: string
  
    constructor(target: string) {
        this.target = target
    }

    /**
     * Emite um log.
     * 
     * @param info ``ILoggerInfo`` As informações da mensagem de log. 
     */
    EmitLog(info: ILoggerInfo) {
        let log = Logger.FormatLog(info.origin ?? "Log", info.content, info.exception)

        if (process.env.DEBUG) {
            console.log(log)
        }
    
        this.WriteLog(log)
    }

    private WriteLog(log: string) {
        fs.writeFileSync(process.env.LOG_DIR + this.target, log + "\n", { flag: "a+" })
    }

    static FormatLog(origin: string, content: string, exception?: string): string {
        let config = OpenJsonConfig("config.json")
        
        let time = DateTime.local().setLocale(config.locale as string).setZone(config.timezone as string)
        let timestamp = time.toFormat("dd/MM/yyyy H:mm:ss")
    
        return `[${timestamp}] [${origin}]${exception? ` [${exception}]` : ""}: ${content}`
    }
}

export default Logger
