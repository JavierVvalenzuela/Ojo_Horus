import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComunidadesPage } from './comunidades.page';

const routes: Routes = [
  {
    path: '',
    component: ComunidadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComunidadesPageRoutingModule {}
