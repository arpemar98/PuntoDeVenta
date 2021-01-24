import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarArticuloPage } from './editar-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarArticuloPageRoutingModule {}
