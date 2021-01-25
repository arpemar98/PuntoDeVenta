import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { EditarArticuloPageModule } from './modals/editar-articulo/editar-articulo.module';
import { AgregarArticuloPageModule } from './modals/agregar-articulo/agregar-articulo.module';
import { DatePipe } from '@angular/common'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    AgregarArticuloPageModule,
    EditarArticuloPageModule    
  ],
  declarations: [Tab2Page],
  exports: [Tab2Page],
  providers: [DatePipe]
})
export class Tab2PageModule {}
