import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticadeusuarioPageRoutingModule } from './politicadeusuario-routing.module';

import { PoliticadeusuarioPage } from './politicadeusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticadeusuarioPageRoutingModule
  ],
  declarations: [PoliticadeusuarioPage]
})
export class PoliticadeusuarioPageModule {}
