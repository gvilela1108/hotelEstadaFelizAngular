import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ClienteService} from '../../services/cliente.service';
 
import {Clientes} from '../../beans/clientes';
import { DadosClientes } from 'src/app/beans/dadosClientes';
  
@Component({
    selector: 'app-consulta-clientes',
    templateUrl: './clienteConsulta.component.html',
    styleUrls:["./clienteConsulta.component.scss"]
  })
  export class ClienteConsultaComponent implements OnInit {
 
    clientes: Clientes[] = new Array();
    private titulo:string;
    private dadosClientes: DadosClientes;
    private tipo:string;

    constructor(private clienteService: ClienteService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    ngOnInit() {
      this.titulo = "Registros Cadastrados";
      this.tipo = localStorage.getItem("idTipoFuncionario");

      if (this.tipo != null && this.tipo != "undefined") {
        this.clienteService.getClientes().subscribe(res => this.clientes = res);
      } else {
        this.router.navigate(['']);
      }
      
    }

    excluir(cpf:string, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
        this.dadosClientes = new DadosClientes();
        this.dadosClientes.cpf = cpf;
        this.dadosClientes.idTipoFuncionario = Number(this.tipo);
        this.clienteService.excluirClientes(this.dadosClientes).subscribe(res => this.clientes.splice(index,1));
      }
 
    }
 
    editar(codigo:number,tipo:number):void{
 
      this.router.navigate(['/cadastroCliente', { codigo: codigo}]);
 
    }
 
    novo():void{
      this.router.navigate(['/cadastroCliente']);
    }
  }