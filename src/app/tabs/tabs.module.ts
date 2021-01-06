import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../components/common-components.module';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import {
  HomePageModule,
  RedFlagsTransitPageModule,
  RedFlagsSchoolPageModule,
  ReportPageModule,
  ResourcesPageModule
} from '../pages';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    CommonComponentsModule,
    HomePageModule, RedFlagsTransitPageModule, RedFlagsSchoolPageModule, ReportPageModule, ResourcesPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
