// Classe genértica para lidar com transações

/** Representação da função de uma operação de transação */
type TransactionOperation = (callback: TransactionCallback, ...args: any[]) => unknown

/** Representação de um callback de funçao de transação */
type TransactionCallback = (...args: any[]) => unknown

/** Classe de representa uma transação */
class TransactionManager {
    private transaction: TransactionOperation

    constructor(transaction: TransactionOperation) {
        this.transaction = transaction
    }

    /**
     * Executa uma transação.
     * @param callback ``TransactionCallback`` A função que executa as operações do banco de dados
     */
    Load(callback: TransactionCallback, ...args: any[]): unknown {
        return this.transaction(callback, ...args)
    }
}

export default TransactionManager
