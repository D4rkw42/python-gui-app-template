// Funções básicas matemáticas

/**
 * Gera um número aleatório inteiro na faixa [min, max]
 * 
 * @param min Valor mínimo
 * @param max Valor máximo
 * @returns O número aleatório
 */
function RandInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export { RandInt }
