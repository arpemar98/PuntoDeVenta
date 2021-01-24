import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarArticuloPageRoutingModule } from './agregar-articulo-routing.module';

import { AgregarArticuloPage } from './agregar-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarArticuloPageRoutingModule
  ],
  declarations: [AgregarArticuloPage]
})
export class AgregarArticuloPageModule {}
