export class DadosLogin {
    constructor(
      public email: string = '',
      public senha: string = '',
      public idTipoFuncionario: number = 0,
      public erroLogin: string = ''
    ) {}
  }