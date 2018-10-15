import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {HospedagemService} from '../../services/hospedagem.service';
 
import {Hospedagem} from '../../beans/hospedagem';
import { DadosHospedagem } from 'src/app/beans/dadosHospedagem';
import { Consumo } from 'src/app/beans/consumo';
  
@Component({
    selector: 'app-consulta-hospedagens',
    templateUrl: './hospedagemConsulta.component.html',
    styleUrls:["./hospedagemConsulta.component.scss"]
  })
  export class HospedagemConsultaComponent implements OnInit {
 
    hospedagens: Hospedagem[] = new Array();
    private titulo:string;
    private dadosHospedagem: DadosHospedagem;
    private tipo:string;

    constructor(private hospedagemService: HospedagemService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    ngOnInit() {
      this.titulo = "Registros Cadastrados";
      this.tipo = localStorage.getItem("idTipoFuncionario"); 
      if (this.tipo != null && this.tipo != "undefined") {
        this.hospedagemService.getHospedagens().subscribe(res => this.hospedagens = res);
      } else {
        this.router.navigate(['']);
      }
      
    }

    excluir(idCliente:string,idHotel:string, idQuarto: string, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
        this.dadosHospedagem = new DadosHospedagem();
        this.dadosHospedagem.idCliente = idCliente;
        this.dadosHospedagem.idHotel = idHotel;
        this.dadosHospedagem.idQuarto = idQuarto;
        this.dadosHospedagem.idTipoFuncionario = Number(this.tipo);
        this.dadosHospedagem.consumo = null;
        this.hospedagemService.excluirHospedagem(this.dadosHospedagem).subscribe(res => this.hospedagens.splice(index,1));
      }
 
    }
 
    editar(idCliente:string,idHotel:string,idQuarto:string):void{
 
      this.router.navigate(['/cadastroHospedagem', { idCliente: idCliente, idHotel: idHotel, idQuarto: idQuarto}]);
 
    }
 
    novo():void{
      this.router.navigate(['/cadastroHospedagem']);
    }
  }