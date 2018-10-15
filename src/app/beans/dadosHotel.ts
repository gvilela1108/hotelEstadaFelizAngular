import { Endereco } from "./endereco";

export class DadosHotel {
    constructor(
      public cnpj: string = '',
      public nome: string = '',
      public endereco: Endereco = new Endereco(),
      public telefone: string = '',
      public email: string = '',
      public idTipoFuncionario: number=0
    ) {}
  }