import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesbanearusuariosPageRoutingModule } from './desbanearusuarios-routing.module';

import { DesbanearusuariosPage } from './desbanearusuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesbanearusuariosPageRoutingModule
  ],
  declarations: [DesbanearusuariosPage]
})
export class DesbanearusuariosPageModule {}
