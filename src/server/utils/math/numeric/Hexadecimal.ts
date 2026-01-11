// Funções auxiliares com hexadecimal

import { RandInt } from "@utils/math/basics.js"

/**
 * Gera uma string hexadecimal aleatória
 * 
 * @param length Tamanho da string
 */
function GenerateHexadecimal(length: number): string {
    if (length < 1) {
        throw new Error("Hexadecimal length should be at least 1.")
    }

    let characters = [
        "0", "1", "2", "3",
        "4", "5", "6", "7",
        "8", "9", "A", "B",
        "C", "D", "E", "F"
    ]

    let hex = ""

    for (let i = 0; i < length; ++i) {
        let digit = RandInt(0, 15)
        hex += characters[digit]
    }

    return hex
}

export { GenerateHexadecimal }
