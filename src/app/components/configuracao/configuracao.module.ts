import { ConfiguracaoComponent } from './configuracao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracaoRoutingModule } from './configuracao-routing.module';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [ConfiguracaoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConfiguracaoRoutingModule
  ]
})
export class ConfiguracaoModule { }