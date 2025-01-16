import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosbaneadosPage } from './usuariosbaneados.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosbaneadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosbaneadosPageRoutingModule {}
