import fs from "node:fs"

/**
 * Criação de diretórios necessários em runtime
 */
function SetupDirectories() {
    let dirs = ["DATA_DIR", "LOG_DIR"]
    let errors = 0

    for (let dir of dirs) {
        if (process.env[dir] === undefined) {
            console.log( `Missing environment configuration for ${dir}.`)
            errors++
            continue
        } else if (process.env[dir] === "") {
            console.log(`Invalid environment configuration for ${dir}.`)
            errors++
            continue
        }

        fs.mkdirSync(process.env[dir], { recursive: true })
    }

    if (errors !== 0) {
        throw new Error();
    }
}

/**
 * Executa todas as configurações de setup
 */
function Setup() {
    SetupDirectories()
}

export default Setup
