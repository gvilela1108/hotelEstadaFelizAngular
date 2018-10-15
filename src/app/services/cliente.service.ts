import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { map } from 'rxjs/operators';
 
import {Clientes} from '../beans/clientes';
import {ConfigService} from './config.services';
import {DadosClientes} from '../beans/dadosClientes';
 
@Injectable()
export class ClienteService {
 
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        this.baseUrlService = configService.getUrlService();
 
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }
 
    getClientes(): Observable<Clientes[]> {       
        return this.http.get(this.baseUrlService+"consultarTodosClientes").map(res => res.json());
    }
 
    salvarClientes(cliente: DadosClientes) : Observable<Clientes[]>{
        return this.http.post(this.baseUrlService+"inserirCliente", JSON.stringify(cliente),this.options)
        .map(res => res.json());
    }

    getClientesByCpf(cliente: DadosClientes): Observable<Clientes[]> { 
        return this.http.post(this.baseUrlService+"consultarCliente", JSON.stringify(cliente),this.options)
        .map(res => res.json());      
    }

    alterarClientes(cliente: DadosClientes) : Observable<Clientes[]>{
        return this.http.put(this.baseUrlService+"atualizarCliente", JSON.stringify(cliente),this.options)
        .map(res => res.json());
    }    
    
    excluirClientes(cliente: DadosClientes){
        
        this.options.body = JSON.stringify(cliente);
        return this.http.delete(this.baseUrlService+"deletarCliente",this.options)
        .map(res => res.json());
    }
 
 
}