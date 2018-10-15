import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { map } from 'rxjs/operators';
 
import {Hotel} from '../beans/hotel';
import {ConfigService} from './config.services';
import {DadosHotel} from '../beans/dadosHotel';
 
@Injectable()
export class HotelService {
 
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        this.baseUrlService = configService.getUrlService();
 
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }
 
    getHoteis(): Observable<Hotel[]> {       
        return this.http.get(this.baseUrlService+"consultarTodosHoteis").map(res => res.json());
    }
 
    salvarHoteis(hotel: DadosHotel) : Observable<Hotel[]>{
        return this.http.post(this.baseUrlService+"inserirHotel", JSON.stringify(hotel),this.options)
        .map(res => res.json());
    }

    getHoteisByCpf(hotel: DadosHotel): Observable<Hotel[]> { 
        return this.http.post(this.baseUrlService+"consultarHotel", JSON.stringify(hotel),this.options)
        .map(res => res.json());      
    }

    alterarHoteis(hotel: DadosHotel) : Observable<Hotel[]>{
        return this.http.put(this.baseUrlService+"atualizarHotel", JSON.stringify(hotel),this.options)
        .map(res => res.json());
    }    
    
    excluirHoteis(hotel: DadosHotel){
        
        this.options.body = JSON.stringify(hotel);
        return this.http.delete(this.baseUrlService+"deletarHotel",this.options)
        .map(res => res.json());
    }
 
 
}