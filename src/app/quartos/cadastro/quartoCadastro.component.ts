import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {QuartoService} from '../../services/quarto.service';
 
import {Quartos} from '../../beans/quartos';
  
import { Observable } from 'rxjs/Observable';
import { DadosQuartos } from 'src/app/beans/dadosQuartos';
 
@Component({
    selector: 'app-cadastro-quartos',
    templateUrl: './quartoCadastro.component.html',
    styleUrls:["./quartoCadastro.component.scss"]
  })
  export class QuartoCadastroComponent implements OnInit {
 
    private codigo:string;
    private tipo:string;
    private hotel:string;
    private submitType: string;
    private dadosQuartos:DadosQuartos = new DadosQuartos();

    private quartos: Quartos[];
    quartosModel: Quartos;
 
    constructor(private quartoService: QuartoService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}

    ngOnInit() {
      this.tipo = localStorage.getItem("idTipoFuncionario"); 
      
      if(this.tipo == null || this.tipo == undefined) {
        this.router.navigate(['']);
      }
         
      this.quartosModel = new Quartos();
      this.activatedRoute.params.subscribe(res=>this.codigo = res["codigo"]);
      this.activatedRoute.params.subscribe(res=>this.hotel = res["hotel"]);

      if (this.codigo != undefined){
        this.submitType = 'Update';
        this.dadosQuartos.numero = this.codigo;
        this.dadosQuartos.idHotel = this.hotel;
        this.quartoService.getQuartosByNumeroIdHotel(this.dadosQuartos).subscribe(res => this.quartosModel = res[0]);
      } else {
        this.submitType = 'Save';
      }
      
    }
    onSave():void {
      
      this.dadosQuartos.numero = this.quartosModel.numero;
      this.dadosQuartos.preco = Number(this.quartosModel.preco);
      this.dadosQuartos.descricao = this.quartosModel.descricao;
      this.dadosQuartos.tipo = this.quartosModel.tipo;
      this.dadosQuartos.idHotel = this.quartosModel.idHotel;

      this.dadosQuartos.idTipoFuncionario = Number(this.tipo);

      if (this.submitType === 'Update') {
        this.quartoService.alterarQuartos(this.dadosQuartos).subscribe(res => {this.quartos= res; this.router.navigate(['/quartos']);});
      } else {
        this.quartoService.salvarQuartos(this.dadosQuartos).subscribe(res => {this.quartos= res; this.router.navigate(['/quartos']);});
      }
 
    }
 
  }