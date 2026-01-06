/**
 * Representa o registro de um produto que foi ativado
 */
class ProductRegistry {
    public productId: string // hash
    private MACAddress: string // hash
    private CPUUUID: string // hash

    constructor(props: { productId: string, MACAddress: string, CPUUUID: string }) {
        this.productId = props.productId
        this.MACAddress = props.MACAddress
        this.CPUUUID = props.CPUUUID
    }
}

export default ProductRegistry
