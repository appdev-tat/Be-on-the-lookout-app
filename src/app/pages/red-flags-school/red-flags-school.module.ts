import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RedFlagsSchoolPage } from './red-flags-school.page';
import { CommonComponentsModule } from '../../components/common-components.module';

const routes: Routes = [
  {
    path: '',
    component: RedFlagsSchoolPage
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
  declarations: [RedFlagsSchoolPage]
})
export class RedFlagsSchoolPageModule {}
