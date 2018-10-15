import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {HotelService} from '../../services/hotel.service';
 
import {Hotel} from '../../beans/hotel';
import { DadosHotel } from 'src/app/beans/dadosHotel';
  
@Component({
    selector: 'app-consulta-hoteis',
    templateUrl: './hotelConsulta.component.html',
    styleUrls:["./hotelConsulta.component.scss"]
  })
  export class HotelConsultaComponent implements OnInit {
 
    hoteis: Hotel[] = new Array();
    private titulo:string;
    private dadosHoteis: DadosHotel;
    private tipo:string;

    constructor(private hotelService: HotelService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    ngOnInit() {
      this.titulo = "Registros Cadastrados";
      this.tipo = localStorage.getItem("idTipoFuncionario"); 
      
      if (this.tipo != null && this.tipo != "undefined") {
        this.hotelService.getHoteis().subscribe(res => this.hoteis = res);
      } else {
        this.router.navigate(['']);
      }      
    }

    excluir(cnpj:string, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
        this.dadosHoteis = new DadosHotel();
        this.dadosHoteis.cnpj = cnpj;
        this.dadosHoteis.idTipoFuncionario = Number(this.tipo);
        this.hotelService.excluirHoteis(this.dadosHoteis).subscribe(res => this.hoteis.splice(index,1));
      }
 
    }
 
    editar(codigo:number,tipo:number):void{
 
      this.router.navigate(['/cadastroHotel', { codigo: codigo}]);
 
    }
 
    novo():void{
      this.router.navigate(['/cadastroHotel']);
    }
  }