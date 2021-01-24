import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarArticuloPageRoutingModule } from './editar-articulo-routing.module';

import { EditarArticuloPage } from './editar-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarArticuloPageRoutingModule
  ],
  declarations: [EditarArticuloPage]
})
export class EditarArticuloPageModule {}
