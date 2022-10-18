import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracaoComponent } from './configuracao.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracaoComponent
  },
  {
    path: '**',
    redirectTo: 'configuracao',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracaoRoutingModule { }