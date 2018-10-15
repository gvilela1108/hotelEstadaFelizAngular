import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FuncionarioService} from '../../services/funcionario.service';
 
import {Funcionarios} from '../../beans/funcionarios';
import { DadosFuncionarios } from 'src/app/beans/dadosFuncionarios';
  
@Component({
    selector: 'app-consulta-funcionarios',
    templateUrl: './funcionarioConsulta.component.html',
    styleUrls:["./funcionarioConsulta.component.scss"]
  })
  export class FuncionarioConsultaComponent implements OnInit {
 
    funcionarios: Funcionarios[] = new Array();
    private titulo:string;
    private dadosFuncionarios: DadosFuncionarios;
    private tipo:string;

    constructor(private funcionarioService: FuncionarioService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    ngOnInit() {
      this.titulo = "Registros Cadastrados";
      this.tipo = localStorage.getItem("idTipoFuncionario");   

      if (this.tipo != null && this.tipo != "undefined") {
        this.funcionarioService.getFuncionarios().subscribe(res => this.funcionarios = res);
      } else {
        this.router.navigate(['']);
      }
    }

    excluir(cpf:string, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
        this.dadosFuncionarios = new DadosFuncionarios();
        this.dadosFuncionarios.cpf = cpf;
        this.dadosFuncionarios.idTipoFuncionario = Number(this.tipo);
        this.funcionarioService.excluirFuncionarios(this.dadosFuncionarios).subscribe(res => this.funcionarios.splice(index,1));
      }
 
    }
 
    editar(codigo:number,tipo:number):void{
 
      this.router.navigate(['/cadastroFuncionarios', { codigo: codigo}]);
 
    }
 
    novo():void{
      this.router.navigate(['/cadastroFuncionarios']);
    }
  }