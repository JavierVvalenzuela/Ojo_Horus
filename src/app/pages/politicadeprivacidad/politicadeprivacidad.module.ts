import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticadeprivacidadPageRoutingModule } from './politicadeprivacidad-routing.module';

import { PoliticadeprivacidadPage } from './politicadeprivacidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticadeprivacidadPageRoutingModule
  ],
  declarations: [PoliticadeprivacidadPage]
})
export class PoliticadeprivacidadPageModule {}
