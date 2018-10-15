import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {HospedagemService} from '../../services/hospedagem.service';
 
import {Hospedagem} from '../../beans/hospedagem';
import {Consumo} from '../../beans/consumo';
  
import { Observable } from 'rxjs/Observable';
import { DadosHospedagem } from 'src/app/beans/dadosHospedagem';
 
@Component({
    selector: 'app-cadastro-hospedagem',
    templateUrl: './hospedagemCadastro.component.html',
    styleUrls:["./hospedagemCadastro.component.scss"]
  })
  export class HospedagemCadastroComponent implements OnInit {
 
    private idCliente:string;
	  private idHotel:string;
	  private idQuarto:string;
    private tipo:string;
    private submitType: string;
    private dadosHospedagens:DadosHospedagem = new DadosHospedagem();
    private consumo: Consumo = new Consumo();

    private hospedagens: Hospedagem[];
    hospedagensModel: Hospedagem = new Hospedagem();

 
    constructor(private hospedagemService: HospedagemService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}

    ngOnInit() {
      this.tipo = localStorage.getItem("idTipoFuncionario"); 
 

      if(this.tipo == null || this.tipo == undefined) {
        this.router.navigate(['']);
      }

      this.hospedagensModel = new Hospedagem();
      this.activatedRoute.params.subscribe(res=>this.idCliente = res["idCliente"]);
	    this.activatedRoute.params.subscribe(res=>this.idHotel = res["idHotel"]);
      this.activatedRoute.params.subscribe(res=>this.idQuarto = res["idQuarto"]);
      
      if (this.idCliente != undefined){
        this.submitType = 'Update';
        this.dadosHospedagens.idCliente = this.idCliente;
		    this.dadosHospedagens.idQuarto = this.idQuarto;
		    this.dadosHospedagens.idHotel = this.idHotel;
        this.hospedagemService.getHospedagemByClienteHotelQuarto(this.dadosHospedagens).subscribe(res => this.hospedagensModel = res[0]);
      } else {
        this.submitType = 'Save';
      }
      
    }

    onSave():void {

      this.dadosHospedagens.idCliente = this.hospedagensModel.idCliente;
      this.dadosHospedagens.idHotel = this.hospedagensModel.idHotel;
      this.dadosHospedagens.idQuarto = this.hospedagensModel.idQuarto;
      this.dadosHospedagens.checkin = this.hospedagensModel.checkin;
      this.dadosHospedagens.checkout = this.hospedagensModel.checkout;

      this.consumo.idProduto = this.hospedagensModel.consumo.idProduto; 
      this.consumo.nomeProduto = this.hospedagensModel.consumo.nomeProduto;
      this.consumo.quantidadeConsumida = this.hospedagensModel.consumo.quantidadeConsumida;
      this.consumo.precoTotal = this.hospedagensModel.consumo.precoTotal ;
      this.consumo.dataConsumo = this.hospedagensModel.consumo.dataConsumo ;

      this.dadosHospedagens.consumo = this.consumo;

      this.dadosHospedagens.idTipoFuncionario = Number(this.tipo);

      if (this.submitType === 'Update') {
        this.hospedagemService.alterarHospedagem(this.dadosHospedagens).subscribe(res => {this.hospedagens= res; this.router.navigate(['/hospedagens']);});
      } else {
        this.hospedagemService.salvarHospedagem(this.dadosHospedagens).subscribe(res => {this.hospedagens= res; this.router.navigate(['/hospedagens']);});
      }
 
    }
 
  }