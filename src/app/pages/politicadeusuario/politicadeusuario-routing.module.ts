import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticadeusuarioPage } from './politicadeusuario.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticadeusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticadeusuarioPageRoutingModule {}
