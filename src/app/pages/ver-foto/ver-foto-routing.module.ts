import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerFotoPage } from './ver-foto.page';

const routes: Routes = [
  {
    path: '',
    component: VerFotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerFotoPageRoutingModule {}
