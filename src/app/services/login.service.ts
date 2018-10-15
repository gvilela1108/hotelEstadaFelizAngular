import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { map } from 'rxjs/operators';
 
import {Login} from '../beans/login';
import {ConfigService} from './config.services';
import {DadosLogin} from '../beans/dadosLogin';

@Injectable()
export class LoginService {
 
    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
 
    constructor(private http: Http,
                private configService: ConfigService) { 
 
        this.baseUrlService = configService.getUrlService();
 
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        this.options = new RequestOptions({ headers: this.headers });
    }

    login(login: DadosLogin): Observable<Login[]> { 
        return this.http.post(this.baseUrlService+"login", JSON.stringify(login),this.options)
        .map(res => res.json());      
    }
 
 
}