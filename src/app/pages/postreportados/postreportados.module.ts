import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostreportadosPageRoutingModule } from './postreportados-routing.module';

import { PostreportadosPage } from './postreportados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostreportadosPageRoutingModule
  ],
  declarations: [PostreportadosPage]
})
export class PostreportadosPageModule {}
