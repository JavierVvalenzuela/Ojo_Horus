import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportarContenidoPageRoutingModule } from './reportar-contenido-routing.module';

import { ReportarContenidoPage } from './reportar-contenido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportarContenidoPageRoutingModule
  ],
  declarations: [ReportarContenidoPage]
})
export class ReportarContenidoPageModule {}
