import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesbanearusuariosPage } from './desbanearusuarios.page';

const routes: Routes = [
  {
    path: '',
    component: DesbanearusuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesbanearusuariosPageRoutingModule {}
