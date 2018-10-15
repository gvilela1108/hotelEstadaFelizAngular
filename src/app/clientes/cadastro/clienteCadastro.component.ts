import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {ClienteService} from '../../services/cliente.service';
 
import {Clientes} from '../../beans/clientes';
import {Endereco} from '../../beans/endereco';
  
import { Observable } from 'rxjs/Observable';
import { DadosClientes } from 'src/app/beans/dadosClientes';
 
@Component({
    selector: 'app-cadastro-cliente',
    templateUrl: './clienteCadastro.component.html',
    styleUrls:["./clienteCadastro.component.scss"]
  })
  export class ClienteCadastroComponent implements OnInit {
 
    private codigo:string;
    private tipo:string;
    private submitType: string;
    private dadosClientes:DadosClientes = new DadosClientes();
    private endereco: Endereco = new Endereco();

    private clientes: Clientes[];
    clientesModel: Clientes;

 
    constructor(private clienteService: ClienteService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}

    ngOnInit() {
      this.tipo = localStorage.getItem("idTipoFuncionario");
      this.clientesModel = new Clientes();
      this.activatedRoute.params.subscribe(res=>this.codigo = res["codigo"]);

      if(this.tipo == null || this.tipo == undefined) {
        this.router.navigate(['']);
      }

      if (this.codigo != undefined){
        this.submitType = 'Update';
        this.dadosClientes.cpf = this.codigo;
        this.clienteService.getClientesByCpf(this.dadosClientes).subscribe(res => this.clientesModel = res[0]);
      } else {
        this.submitType = 'Save';
      }
      
    }

    onSave():void {

      this.dadosClientes.cpf = this.clientesModel.cpf;
      this.dadosClientes.nome = this.clientesModel.nome;
      this.dadosClientes.telefone = this.clientesModel.telefone;
      this.dadosClientes.email = this.clientesModel.email;

      this.endereco.cep = this.clientesModel.endereco.cep; 
      this.endereco.logradouro = this.clientesModel.endereco.logradouro;
      this.endereco.complemento = this.clientesModel.endereco.complemento;
      this.endereco.bairro = this.clientesModel.endereco.bairro;
      this.endereco.cidade = this.clientesModel.endereco.cidade;
      this.endereco.estado = this.clientesModel.endereco.estado;
      this.dadosClientes.endereco = this.endereco;

      this.dadosClientes.idTipoFuncionario = Number(this.tipo);

      if (this.submitType === 'Update') {
        this.clienteService.alterarClientes(this.dadosClientes).subscribe(res => {this.clientes= res; this.router.navigate(['/clientes']);});
      } else {
        this.clienteService.salvarClientes(this.dadosClientes).subscribe(res => {this.clientes= res; this.router.navigate(['/clientes']);});
      }
 
    }
 
  }