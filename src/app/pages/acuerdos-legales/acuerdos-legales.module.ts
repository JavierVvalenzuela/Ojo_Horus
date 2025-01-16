import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcuerdosLegalesPageRoutingModule } from './acuerdos-legales-routing.module';

import { AcuerdosLegalesPage } from './acuerdos-legales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcuerdosLegalesPageRoutingModule
  ],
  declarations: [AcuerdosLegalesPage]
})
export class AcuerdosLegalesPageModule {}
