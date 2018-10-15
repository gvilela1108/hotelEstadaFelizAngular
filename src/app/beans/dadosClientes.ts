import {Endereco} from '../beans/endereco';
export class DadosClientes {
    constructor(
      public cpf: string = '',
      public nome: string = '',
      public cep: string = '',
      public endereco: Endereco = new Endereco(),
      public telefone: string = '',
      public email: string = '',
      public idTipoFuncionario: number = 0,
      public erroCliente: string = '',
      public findCpf: string = ''
    ) {}
  }