import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { LojaComponent } from './loja/loja.component';
import { PedidoComponent } from './components/pedido/pedido.component';

const routes: Routes =[
    { path: 'login',          component: LoginComponent },
    { path: 'loja/:company',          component: LojaComponent },
    { path: 'pedidos/:company',          component: PedidosComponent, canActivate: [AuthGuard] },
    { path: 'pedido/:id',          component: PedidoComponent },
    { path: 'configuracao',          component: ConfiguracaoComponent, canActivate: [AuthGuard] },
    { path: 'produtos',          component: ProdutosComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
    
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
