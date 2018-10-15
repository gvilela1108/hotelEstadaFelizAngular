import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService} from './services/config.services';
import { ClienteService} from './services/cliente.service';
import { ProdutoService} from './services/produto.service';
import { QuartoService } from './services/quarto.service';
import { FuncionarioService } from './services/funcionario.service';
import { HotelService } from './services/hotel.service';
import { HospedagemService } from './services/hospedagem.service';
import { LoginService } from './services/login.service';

import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ClienteCadastroComponent } from './clientes/cadastro/clienteCadastro.component';
import { ClienteConsultaComponent } from './clientes/consulta/clienteConsulta.component';
import { ProdutoCadastroComponent } from './produtos/cadastro/produtoCadastro.component';
import { ProdutoConsultaComponent } from './produtos/consulta/produtoConsulta.component';
import { QuartoCadastroComponent } from './quartos/cadastro/quartoCadastro.component';
import { QuartoConsultaComponent } from './quartos/consulta/quartoConsulta.component';
import { FuncionariosCadastroComponent } from './funcionarios/cadastro/funcionarioCadastro.component';
import { FuncionarioConsultaComponent } from './funcionarios/consulta/funcionarioConsulta.component';
import { HotelCadastroComponent } from './hoteis/cadastro/hotelCadastro.component';
import { HotelConsultaComponent } from './hoteis/consulta/hotelConsulta.component';
import { HospedagemCadastroComponent } from './hospedagem/cadastro/hospedagemCadastro.component';
import { HospedagemConsultaComponent } from './hospedagem/consulta/hospedagemConsulta.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ClienteCadastroComponent,
    ClienteConsultaComponent,
    ProdutoCadastroComponent,
    ProdutoConsultaComponent,
    QuartoCadastroComponent,
    QuartoConsultaComponent,
    FuncionariosCadastroComponent,
    FuncionarioConsultaComponent,
    HotelCadastroComponent,
    HotelConsultaComponent,
    HospedagemCadastroComponent,
    HospedagemConsultaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    MatToolbarModule, MatInputModule, MatTableModule
  ],schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ConfigService, ClienteService,ProdutoService,QuartoService,FuncionarioService,HotelService,HospedagemService,LoginService],
  bootstrap: [AppComponent],
  exports: [MatToolbarModule, MatInputModule, MatTableModule]
})
export class AppModule { }
