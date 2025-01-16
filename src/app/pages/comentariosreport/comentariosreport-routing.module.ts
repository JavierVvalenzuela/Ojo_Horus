import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentariosreportPage } from './comentariosreport.page';

const routes: Routes = [
  {
    path: '',
    component: ComentariosreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentariosreportPageRoutingModule {}
