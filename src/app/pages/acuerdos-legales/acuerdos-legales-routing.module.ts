import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcuerdosLegalesPage } from './acuerdos-legales.page';

const routes: Routes = [
  {
    path: '',
    component: AcuerdosLegalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcuerdosLegalesPageRoutingModule {}
