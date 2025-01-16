import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticadeprivacidadPage } from './politicadeprivacidad.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticadeprivacidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticadeprivacidadPageRoutingModule {}
