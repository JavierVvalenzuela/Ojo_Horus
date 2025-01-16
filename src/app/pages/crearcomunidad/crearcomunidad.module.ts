import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearcomunidadPageRoutingModule } from './crearcomunidad-routing.module';

import { CrearcomunidadPage } from './crearcomunidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearcomunidadPageRoutingModule
  ],
  declarations: [CrearcomunidadPage]
})
export class CrearcomunidadPageModule {}
