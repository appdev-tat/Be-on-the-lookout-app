import { environment } from '../environments/environment';

// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// NG Translate
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { SelfReferentialCompiler, FallbackTranslateHttpLoader } from './translate-tools';
// AoT requires an exported function for factories
export function HttpLoaderFactory( http: HttpClient ) {
  return new FallbackTranslateHttpLoader( http, `${environment.externalResourcesURL}i18n/trx_`, './assets/i18n/trx_', '.json', 2000 );
}

// ionic
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// native cordova/ionic
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { IonicStorageModule } from '@ionic/storage';

// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonComponentsModule } from './components/common-components.module';
import {
  WhatToReportComponent, VideosComponent, RecommendedBooksComponent,
  AboutBotlComponent, HumanTraffickingLawsComponent, PodcastsComponent,
  GenericModalComponent,
  SurveyComponent
} from './modals';
import { TabsPageModule } from './tabs/tabs.module';
import { RedFlagsPopover } from './tabs/popovers/red-flags/red-flags.popover';

@NgModule({
  declarations: [
    AppComponent,
    WhatToReportComponent, VideosComponent, RecommendedBooksComponent,
    AboutBotlComponent, HumanTraffickingLawsComponent, PodcastsComponent,
    GenericModalComponent,
    SurveyComponent,
    RedFlagsPopover
  ],
  entryComponents: [
    WhatToReportComponent, VideosComponent, RecommendedBooksComponent,
    AboutBotlComponent, HumanTraffickingLawsComponent, PodcastsComponent,
    GenericModalComponent,
    SurveyComponent,
    RedFlagsPopover
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: SelfReferentialCompiler
      }
    }),
    CommonComponentsModule,
    TabsPageModule
  ],
  providers: [
    StatusBar, SplashScreen, Dialogs, Network, AndroidPermissions, Sim, Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
