import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CurrencyMaskDirective } from './pipe/maskCurrency';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import {CommonModule} from '@angular/common';

import { SharedModule } from './shared/shared.module';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { LojaComponent } from './loja/loja.component';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './services/token-interceptor';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ReversePipe } from './pipe/sort';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localePt)
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    ProdutosComponent,
    PedidosComponent,
    ConfiguracaoComponent,
    LojaComponent,
    PedidoComponent,
    ReversePipe,
    CurrencyMaskDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,

  ],
  exports:[
    CurrencyMaskDirective
  ],
  providers: [CookieService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, {
    provide: LOCALE_ID, 
    useValue: "pt-BR"
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
