import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
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

const routes: Routes = [
  { path: '',                        component: LoginComponent },
  { path: 'home',                    component: HomeComponent },
  { path: 'clientes',                component: ClienteConsultaComponent },
  { path: 'cadastroCliente',         component: ClienteCadastroComponent },
  { path: 'cadastroCliente/:codigo', component: ClienteCadastroComponent },
  { path: 'produtos',                component: ProdutoConsultaComponent },
  { path: 'cadastroProdutos',         component: ProdutoCadastroComponent },
  { path: 'cadastroProdutos/:codigo', component: ProdutoCadastroComponent },
  { path: 'quartos',                component: QuartoConsultaComponent },
  { path: 'cadastroQuartos',         component: QuartoCadastroComponent },
  { path: 'cadastroProdutos/:codigo/:hotel', component: QuartoCadastroComponent },
  { path: 'funcionarios',                component: FuncionarioConsultaComponent },
  { path: 'cadastroFuncionarios',         component: FuncionariosCadastroComponent },
  { path: 'cadastroFuncionarios/:codigo', component: FuncionariosCadastroComponent },
  { path: 'hoteis',                component: HotelConsultaComponent },
  { path: 'cadastroHotel',         component: HotelCadastroComponent },
  { path: 'cadastroHotel/:codigo', component: HotelCadastroComponent },
  { path: 'hospedagens',                component: HospedagemConsultaComponent },
  { path: 'cadastroHospedagem',         component: HospedagemCadastroComponent },
  { path: 'cadastroHospedagem/:idCliente/:idHotel/:idQuarto', component: HospedagemCadastroComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
