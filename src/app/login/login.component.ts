import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {LoginService} from '../services/login.service';
 
import {Login} from '../beans/login';

import { Observable } from 'rxjs/Observable';
 
@Component({
    selector: 'app-login-hotel',
    templateUrl: './login.component.html',
    styleUrls:["./login.component.scss"]
  })
  export class LoginComponent implements OnInit {
 
    loginModel: Login;
    private dadosLogin:Login = new Login();
    private login: Login[];

    constructor(private loginService: LoginService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}

    ngOnInit() {
      this.loginModel = new Login(); 
      localStorage.removeItem('idTipoFuncionario');
    }

    doLogin():void {

      this.dadosLogin.email = this.loginModel.email;
      this.dadosLogin.senha = this.loginModel.senha;

      this.loginService.login(this.dadosLogin)
        .subscribe(res => {
          this.login= res; 
          localStorage.setItem('idTipoFuncionario',String(this.login[0].idTipoFuncionario));
                    
          if (this.login[0].idTipoFuncionario == null) {
            this.router.navigate(['']);
          } else {
            this.router.navigate(['/home']);
          }
        });
    }
 
  }