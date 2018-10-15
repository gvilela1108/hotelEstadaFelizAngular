import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {QuartoService} from '../../services/quarto.service';
 
import {Quartos} from '../../beans/quartos';
import { DadosQuartos } from 'src/app/beans/dadosQuartos';
import { Alert } from 'selenium-webdriver';
  
@Component({
    selector: 'app-consulta-quartos',
    templateUrl: './quartoConsulta.component.html',
    styleUrls:["./quartoConsulta.component.scss"]
  })
  export class QuartoConsultaComponent implements OnInit {
 
    quartos: Quartos[] = new Array();
    private titulo:string;
    private dadosQuartos: DadosQuartos;
    private tipo:string;

    constructor(private quartoService: QuartoService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    ngOnInit() {
      this.titulo = "Registros Cadastrados";
      this.tipo = localStorage.getItem("idTipoFuncionario"); 
      
      if (this.tipo != null && this.tipo != "undefined") {
        this.quartoService.getQuartos().subscribe(res => this.quartos = res);
      } else {
        this.router.navigate(['']);
      }  
    }

    excluir(numero:string,idHotel:string, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
        this.dadosQuartos = new DadosQuartos();
        this.dadosQuartos.numero = numero;
        this.dadosQuartos.idHotel = idHotel;
        this.dadosQuartos.idTipoFuncionario = Number(this.tipo);
        this.quartoService.excluirQuartos(this.dadosQuartos).subscribe(res => this.quartos.splice(index,1));
      }
 
    }
 
    editar(codigo:number, idHotel:string, tipo:number):void{
      this.router.navigate(['/cadastroQuartos', { codigo: codigo, hotel: idHotel }]);
 
    }
 
    novo():void{
      this.router.navigate(['/cadastroQuartos']);
    }
  }