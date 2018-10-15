import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { map } from 'rxjs/operators';
 
import {Produtos} from '../beans/produtos';
import {ConfigService} from './config.services';
import {DadosProdutos} from '../beans/dadosProdutos';
 
@Injectable()
export class ProdutoService {
 
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        this.baseUrlService = configService.getUrlService();
 
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }
 
    getProdutos(): Observable<Produtos[]> {       
        return this.http.get(this.baseUrlService+"consultarTodosProdutos").map(res => res.json());
    }
 
    salvarProdutos(produtos: DadosProdutos) : Observable<Produtos[]>{
        return this.http.post(this.baseUrlService+"inserirProduto", JSON.stringify(produtos),this.options)
        .map(res => res.json());
    }

    getProdutosByNome(produto: DadosProdutos): Observable<Produtos[]> { 
        return this.http.post(this.baseUrlService+"consultarProduto", JSON.stringify(produto),this.options)
        .map(res => res.json());      
    }

    alterarProdutos(produto: DadosProdutos) : Observable<Produtos[]>{
        return this.http.put(this.baseUrlService+"atualizarProduto", JSON.stringify(produto),this.options)
        .map(res => res.json());
    }    
    
    excluirProdutos(produto: DadosProdutos){
        
        this.options.body = JSON.stringify(produto);
        return this.http.delete(this.baseUrlService+"deletarProduto",this.options)
        .map(res => res.json());
    }
 
 
}