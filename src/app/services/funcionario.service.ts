import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { map } from 'rxjs/operators';
 
import {Funcionarios} from '../beans/funcionarios';
import {ConfigService} from './config.services';
import {DadosFuncionarios} from '../beans/dadosFuncionarios';
 
@Injectable()
export class FuncionarioService {
 
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        this.baseUrlService = configService.getUrlService();
 
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }
 
    getFuncionarios(): Observable<Funcionarios[]> {       
        return this.http.get(this.baseUrlService+"consultarTodosFuncionarios").map(res => res.json());
    }
 
    salvarFuncionarios(funcionarios: DadosFuncionarios) : Observable<Funcionarios[]>{
        return this.http.post(this.baseUrlService+"inserirFuncionario", JSON.stringify(funcionarios),this.options)
        .map(res => res.json());
    }

    getFuncionariosByCpf(funcionarios: DadosFuncionarios): Observable<Funcionarios[]> { 
        return this.http.post(this.baseUrlService+"consultarFuncionario", JSON.stringify(funcionarios),this.options)
        .map(res => res.json());      
    }

    alterarFuncionarios(funcionarios: DadosFuncionarios) : Observable<Funcionarios[]>{
        return this.http.put(this.baseUrlService+"atualizarFuncionario", JSON.stringify(funcionarios),this.options)
        .map(res => res.json());
    }    
    
    excluirFuncionarios(funcionarios: DadosFuncionarios){
        
        this.options.body = JSON.stringify(funcionarios);
        return this.http.delete(this.baseUrlService+"deletarFuncionario",this.options)
        .map(res => res.json());
    }
 
 
}