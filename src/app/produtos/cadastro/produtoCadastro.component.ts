import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {ProdutoService} from '../../services/produto.service';
 
import {Produtos} from '../../beans/produtos';
  
import { Observable } from 'rxjs/Observable';
import { DadosProdutos } from 'src/app/beans/dadosProdutos';
 
@Component({
    selector: 'app-cadastro-produtos',
    templateUrl: './produtoCadastro.component.html',
    styleUrls:["./produtoCadastro.component.scss"]
  })
  export class ProdutoCadastroComponent implements OnInit {
 
    private codigo:string;
    private tipo:string;
    private submitType: string;
    private dadosProdutos:DadosProdutos = new DadosProdutos();

    private produtos: Produtos[];
    produtosModel: Produtos;
 
    constructor(private produtoService: ProdutoService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}

    ngOnInit() {
      this.tipo = localStorage.getItem("idTipoFuncionario"); 
      
      if(this.tipo == null || this.tipo == undefined) {
        this.router.navigate(['']);
      }

      this.produtosModel = new Produtos();
      this.activatedRoute.params.subscribe(res=>this.codigo = res["codigo"]);

      if (this.codigo != undefined){
        this.submitType = 'Update';
        this.dadosProdutos.nome = this.codigo;
        this.produtoService.getProdutosByNome(this.dadosProdutos).subscribe(res => this.produtosModel = res[0]);
      } else {
        this.submitType = 'Save';
      }
      
    }
    onSave():void {
      
      this.dadosProdutos.nome = this.produtosModel.nome;
      this.dadosProdutos.preco = Number(this.produtosModel.preco);
      this.dadosProdutos.descricao = this.produtosModel.descricao;
      this.dadosProdutos.status = this.produtosModel.status;
      this.dadosProdutos.quantidade = Number(this.produtosModel.quantidade);

      this.dadosProdutos.idTipoFuncionario = Number(this.tipo);

      if (this.submitType === 'Update') {
        this.produtoService.alterarProdutos(this.dadosProdutos).subscribe(res => {this.produtos= res; this.router.navigate(['/produtos']);});
      } else {
        this.produtoService.salvarProdutos(this.dadosProdutos).subscribe(res => {this.produtos= res; this.router.navigate(['/produtos']);});
      }
 
    }
 
  }