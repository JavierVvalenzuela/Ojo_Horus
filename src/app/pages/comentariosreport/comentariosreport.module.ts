import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentariosreportPageRoutingModule } from './comentariosreport-routing.module';

import { ComentariosreportPage } from './comentariosreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosreportPageRoutingModule
  ],
  declarations: [ComentariosreportPage]
})
export class ComentariosreportPageModule {}
