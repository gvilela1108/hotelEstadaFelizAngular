export class Consumo {
    constructor(
        public idProduto: string = '',
        public nomeProduto: string = '',
        public quantidadeConsumida: number = 0,
        public precoTotal: number = 0,
        public dataConsumo: string = ''
    )  {}
}