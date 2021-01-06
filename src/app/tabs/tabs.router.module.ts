import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage, RedFlagsTransitPage, RedFlagsSchoolPage, ReportPage, ResourcesPage } from '../pages';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }, {
        path: 'home',
        component: HomePage
      }, {
        path: 'report',
        component: ReportPage
      }, {
        path: 'red-flags/school',
        component: RedFlagsSchoolPage
      }, {
        path: 'red-flags/transit',
        component: RedFlagsTransitPage
      }, {
        path: 'resources',
        component: ResourcesPage
      }
    ]
  }, {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
