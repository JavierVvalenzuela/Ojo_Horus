import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosbaneadosPageRoutingModule } from './usuariosbaneados-routing.module';

import { UsuariosbaneadosPage } from './usuariosbaneados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosbaneadosPageRoutingModule
  ],
  declarations: [UsuariosbaneadosPage]
})
export class UsuariosbaneadosPageModule {}
