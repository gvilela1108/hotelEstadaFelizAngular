import { Endereco } from "./endereco";

export class Hotel {
    constructor(
      public cnpj: string = '',
      public nome: string = '',
      public endereco: Endereco = new Endereco(),
      public telefone: string = '',
      public erroHotel: string = ''
    ) {}
  }