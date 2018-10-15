import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {FuncionarioService} from '../../services/funcionario.service';
 
import {Funcionarios} from '../../beans/funcionarios';
import {Endereco} from '../../beans/endereco';

import { Observable } from 'rxjs/Observable';
import { DadosFuncionarios } from 'src/app/beans/dadosFuncionarios';
 
@Component({
    selector: 'app-cadastro-funcionarios',
    templateUrl: './funcionarioCadastro.component.html',
    styleUrls:["./funcionarioCadastro.component.scss"]
  })
  export class FuncionariosCadastroComponent implements OnInit {
 
    private codigo:string;
    private tipo:string;
    private submitType: string;
    private dadosFuncionarios:DadosFuncionarios = new DadosFuncionarios();
    private endereco: Endereco = new Endereco();

    private funcionarios: Funcionarios[];
    funcionariosModel: Funcionarios;
 
    constructor(private funcionarioService: FuncionarioService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}

    ngOnInit() {
      this.tipo = localStorage.getItem("idTipoFuncionario");

     
      if(this.tipo == null || this.tipo == undefined) {
        this.router.navigate(['']);
      }
      
      this.funcionariosModel = new Funcionarios();
      this.activatedRoute.params.subscribe(res=>this.codigo = res["codigo"]);
      if (this.codigo != undefined){
        this.submitType = 'Update';
        this.dadosFuncionarios.cpf = this.codigo;
        this.funcionarioService.getFuncionariosByCpf(this.dadosFuncionarios).subscribe(res => this.funcionariosModel = res[0]);
      } else {
        this.submitType = 'Save';
      }
      
    }
    onSave():void {
      
      this.dadosFuncionarios.cpf = this.funcionariosModel.cpf;
      this.dadosFuncionarios.nome = this.funcionariosModel.nome;
      this.dadosFuncionarios.telefone = this.funcionariosModel.telefone;
      this.dadosFuncionarios.email = this.funcionariosModel.email;

      this.endereco.cep = this.funcionariosModel.endereco.cep; 
      this.endereco.logradouro = this.funcionariosModel.endereco.logradouro;
      this.endereco.complemento = this.funcionariosModel.endereco.complemento;
      this.endereco.bairro = this.funcionariosModel.endereco.bairro;
      this.endereco.cidade = this.funcionariosModel.endereco.cidade;
      this.endereco.estado = this.funcionariosModel.endereco.estado;
      this.dadosFuncionarios.endereco = this.endereco;
      
      this.dadosFuncionarios.salario = this.funcionariosModel.salario;
      this.dadosFuncionarios.senha = this.funcionariosModel.senha;
      this.dadosFuncionarios.tipoFuncionario = this.funcionariosModel.tipoFuncionario;
      
      this.dadosFuncionarios.idTipoFuncionario = Number(this.tipo);

      if (this.submitType === 'Update') {
        this.funcionarioService.alterarFuncionarios(this.dadosFuncionarios).subscribe(res => {this.funcionarios= res; this.router.navigate(['/funcionarios']);});
      } else {
        this.funcionarioService.salvarFuncionarios(this.dadosFuncionarios).subscribe(res => {this.funcionarios= res; this.router.navigate(['/funcionarios']);});
      }
 
    }
 
  }