export class DadosProdutos {
    constructor(
      public nome: string = '',
      public preco: number = 0,
      public descricao: string = '',
      public status: string = '',
      public quantidade: number = 0,
      public idTipoFuncionario: number = 0,
      public erroProduto: string = ''
    ) {}
  }