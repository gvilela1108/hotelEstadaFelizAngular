import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {HotelService} from '../../services/hotel.service';
 
import {Hotel} from '../../beans/hotel';
import {Endereco} from '../../beans/endereco';
  
import { Observable } from 'rxjs/Observable';
import { DadosHotel } from 'src/app/beans/dadosHotel';
 
@Component({
    selector: 'app-cadastro-hotel',
    templateUrl: './hotelCadastro.component.html',
    styleUrls:["./hotelCadastro.component.scss"]
  })
  export class HotelCadastroComponent implements OnInit {
 
    private codigo:string;
    private tipo:string;
    private submitType: string;
    private dadosHoteis:DadosHotel = new DadosHotel();
    private endereco: Endereco = new Endereco();

    private hoteis: Hotel[];
    hoteisModel: Hotel;

 
    constructor(private hotelService: HotelService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}

    ngOnInit() {
      this.tipo = localStorage.getItem("idTipoFuncionario"); 
      
      if(this.tipo == null || this.tipo == undefined) {
        this.router.navigate(['']);
      }     

      this.hoteisModel = new Hotel();
      this.activatedRoute.params.subscribe(res=>this.codigo = res["codigo"]);

      if (this.codigo != undefined){
        this.submitType = 'Update';
        this.dadosHoteis.cnpj = this.codigo;
        this.hotelService.getHoteisByCpf(this.dadosHoteis).subscribe(res => this.hoteisModel = res[0]);
      } else {
        this.submitType = 'Save';
      }
      
    }

    onSave():void {

      this.dadosHoteis.cnpj = this.hoteisModel.cnpj;
      this.dadosHoteis.nome = this.hoteisModel.nome;
      this.dadosHoteis.telefone = this.hoteisModel.telefone;

      this.endereco.cep = this.hoteisModel.endereco.cep; 
      this.endereco.logradouro = this.hoteisModel.endereco.logradouro;
      this.endereco.complemento = this.hoteisModel.endereco.complemento;
      this.endereco.bairro = this.hoteisModel.endereco.bairro;
      this.endereco.cidade = this.hoteisModel.endereco.cidade;
      this.endereco.estado = this.hoteisModel.endereco.estado;
      this.dadosHoteis.endereco = this.endereco;

      this.dadosHoteis.idTipoFuncionario = Number(this.tipo);

      if (this.submitType === 'Update') {
        this.hotelService.alterarHoteis(this.dadosHoteis).subscribe(res => {this.hoteis= res; this.router.navigate(['/hoteis']);});
      } else {
        this.hotelService.salvarHoteis(this.dadosHoteis).subscribe(res => {this.hoteis= res; this.router.navigate(['/hoteis']);});
      }
 
    }
 
  }