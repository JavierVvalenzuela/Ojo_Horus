import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostreportadosPage } from './postreportados.page';

const routes: Routes = [
  {
    path: '',
    component: PostreportadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostreportadosPageRoutingModule {}
