import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { map } from 'rxjs/operators';
 
import {Hospedagem} from '../beans/hospedagem';
import {ConfigService} from './config.services';
import {DadosHospedagem} from '../beans/dadosHospedagem';
 
@Injectable()
export class HospedagemService {
 
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        this.baseUrlService = configService.getUrlService();
 
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }
 
    getHospedagens(): Observable<Hospedagem[]> {       
        return this.http.get(this.baseUrlService+"consultarTodasHospedagens").map(res => res.json());
    }
 
    salvarHospedagem(hospedagem: DadosHospedagem) : Observable<Hospedagem[]>{
        return this.http.post(this.baseUrlService+"inserirHospedagem", JSON.stringify(hospedagem),this.options)
        .map(res => res.json());
    }

    getHospedagemByClienteHotelQuarto(hospedagem: DadosHospedagem): Observable<Hospedagem[]> { 
        return this.http.post(this.baseUrlService+"consultarHospedagem", JSON.stringify(hospedagem),this.options)
        .map(res => res.json());      
    }

    alterarHospedagem(hospedagem: DadosHospedagem) : Observable<Hospedagem[]>{
        return this.http.put(this.baseUrlService+"atualizarHospedagem", JSON.stringify(hospedagem),this.options)
        .map(res => res.json());
    }    
    
    excluirHospedagem(hospedagem: DadosHospedagem){
        
        this.options.body = JSON.stringify(hospedagem);
        return this.http.delete(this.baseUrlService+"deletarHospedagem",this.options)
        .map(res => res.json());
    }
 
 
}