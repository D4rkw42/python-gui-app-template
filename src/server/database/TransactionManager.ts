// Classe genértica para lidar com transações

/** Representação da função de uma operação de transação */
type TransactionOperation = (callback: TransactionCallback, ...args: any[]) => unknown

/** Representação de um callback de funçao de transação */
type TransactionCallback = (...args: any[]) => unknown

/** Classe de representa uma transação */
class TransactionManager {
    private transactionA: TransactionOperation

    constructor(transaction: TransactionOperation) {
        this.transactionA = transaction
    }

    /**
     * Executa uma transação.
     * @param callback ``TransactionCallback`` A função que executa as operações do banco de dados
     */
    load(callback: TransactionCallback, ...args: any[]): unknown {
        return this.transactionA(callback, ...args)
    }
}

export default TransactionManager
