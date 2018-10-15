import { Consumo } from "./consumo";

export class DadosHospedagem {
    constructor(
      public idCliente: string = '',
      public idHotel: string = '',
      public idQuarto: string = '',
      public consumo: Consumo = new Consumo(),
      public checkin: string = '',
      public checkout: string = '',
      public idTipoFuncionario: number = 0,
      public erroHospedagem: string = ''
    ) {}
  }