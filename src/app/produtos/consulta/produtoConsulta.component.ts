import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ProdutoService} from '../../services/produto.service';
 
import {Produtos} from '../../beans/produtos';
import { DadosProdutos } from 'src/app/beans/dadosProdutos';
import { Alert } from 'selenium-webdriver';
  
@Component({
    selector: 'app-consulta-produtos',
    templateUrl: './produtoConsulta.component.html',
    styleUrls:["./produtoConsulta.component.scss"]
  })
  export class ProdutoConsultaComponent implements OnInit {
 
    produtos: Produtos[] = new Array();
    private titulo:string;
    private dadosProdutos: DadosProdutos;
    private tipo:string;

    constructor(private produtoService: ProdutoService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    ngOnInit() {
      this.titulo = "Registros Cadastrados";
      this.tipo = localStorage.getItem("idTipoFuncionario"); 
      
      if (this.tipo != null && this.tipo != "undefined") {
        this.produtoService.getProdutos().subscribe(res => this.produtos = res);
      } else {
        this.router.navigate(['']);
      }  
    }

    excluir(nome:string, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
        this.dadosProdutos = new DadosProdutos();
        this.dadosProdutos.nome = nome;
        this.dadosProdutos.idTipoFuncionario = Number(this.tipo);
        this.produtoService.excluirProdutos(this.dadosProdutos).subscribe(res => this.produtos.splice(index,1));
      }
 
    }
 
    editar(codigo:string,tipo:number):void{
      this.router.navigate(['/cadastroProdutos', { codigo: codigo}]);
 
    }
 
    novo():void{
      this.router.navigate(['/cadastroProdutos']);
    }
  }