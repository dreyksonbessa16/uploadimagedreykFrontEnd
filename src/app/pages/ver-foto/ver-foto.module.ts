import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerFotoPageRoutingModule } from './ver-foto-routing.module';

import { VerFotoPage } from './ver-foto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerFotoPageRoutingModule
  ],
  declarations: [VerFotoPage]
})
export class VerFotoPageModule {}
