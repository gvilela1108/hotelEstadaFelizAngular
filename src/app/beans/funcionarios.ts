import { Endereco } from "./endereco";

export class Funcionarios {
    constructor(
      public cpf: string = '',
      public nome: string = '',
      public endereco: Endereco = new Endereco(),
      public telefone: string = '',
      public email: string = '',
      public idTipoFuncionarioLogado: number = 0,
      public tipoFuncionario: number = 0,
      public erroFuncionario: string = '',
      public senha: string ='',
      public salario: number = 0
    ) {}
  }