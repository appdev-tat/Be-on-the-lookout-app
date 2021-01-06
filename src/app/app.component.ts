import { Component, ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService, MiscService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // get a reference to the IonRouterOutlet element
  @ViewChild( IonRouterOutlet, {static: false} ) routerOutlet: IonRouterOutlet;

  constructor(
    public miscService: MiscService,
    private platform: Platform,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private settings: SettingsService,
    private navCtrl: NavController,
    private splash: SplashScreen
  ) {
    this.statusBar.styleBlackOpaque();
    this.statusBar.show();
    this.statusBar.overlaysWebView( false );
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();

    // @@ fix back button behavior on android
    try {
      document.addEventListener( 'backbutton', () => {} );
      this.platform.backButton.subscribe(() => {} );
      this.platform.backButton.subscribeWithPriority( 0, () => {
        this.navCtrl.back();
      });
    } catch (error) {}

    setTimeout( () => this.splash.hide(), 5000 ); // in case the home.page fails to hide the splash

    // configure translations
    this.settings.waitForReady().then( () => {
      this.translate.setDefaultLang( 'en' );
      // wait until the most recent translations have loaded (or timed out) before we show the app content.
      // Otherwise, the user will see the translation keys, like `home.buttonLabels.redFlags`
      this.translate.use( this.settings.language ).toPromise().then( () => this.miscService.languageLoaded = true );
    });

  }

}
