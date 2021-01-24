import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarArticuloPage } from './agregar-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarArticuloPageRoutingModule {}
