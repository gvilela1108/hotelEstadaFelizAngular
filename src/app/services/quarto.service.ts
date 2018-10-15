import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { map } from 'rxjs/operators';
 
import {Quartos} from '../beans/quartos';
import {ConfigService} from './config.services';
import {DadosQuartos} from '../beans/dadosQuartos';
 
@Injectable()
export class QuartoService {
 
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        this.baseUrlService = configService.getUrlService();
 
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }
 
    getQuartos(): Observable<Quartos[]> {       
        return this.http.get(this.baseUrlService+"consultarTodosQuartos").map(res => res.json());
    }
 
    salvarQuartos(quarto: DadosQuartos) : Observable<Quartos[]>{
        return this.http.post(this.baseUrlService+"inserirQuarto", JSON.stringify(quarto),this.options)
        .map(res => res.json());
    }

    getQuartosByNumeroIdHotel(quarto: DadosQuartos): Observable<Quartos[]> { 
        return this.http.post(this.baseUrlService+"consultarQuarto", JSON.stringify(quarto),this.options)
        .map(res => res.json());      
    }

    alterarQuartos(quarto: DadosQuartos) : Observable<Quartos[]>{
        return this.http.put(this.baseUrlService+"atualizarQuarto", JSON.stringify(quarto),this.options)
        .map(res => res.json());
    }    
    
    excluirQuartos(quarto: DadosQuartos){
        
        this.options.body = JSON.stringify(quarto);
        return this.http.delete(this.baseUrlService+"deletarQuarto",this.options)
        .map(res => res.json());
    }
 
 
}