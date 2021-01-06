import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RedFlagsTransitPage } from './red-flags-transit.page';
import { CommonComponentsModule } from '../../components/common-components.module';

const routes: Routes = [
  {
    path: '',
    component: RedFlagsTransitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonComponentsModule
  ],
  declarations: [RedFlagsTransitPage]
})
export class RedFlagsTransitPageModule {}
