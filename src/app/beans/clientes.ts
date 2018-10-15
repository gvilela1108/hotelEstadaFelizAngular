import { Endereco } from "./endereco";

export class Clientes {
    constructor(
      public cpf: string = '',
      public nome: string = '',
      public endereco: Endereco = new Endereco(),
      public telefone: string = '',
      public email: string = '',
      public idTipoFuncionario: number = 0,
      public erroCliente: string = ''
    ) {}
  }