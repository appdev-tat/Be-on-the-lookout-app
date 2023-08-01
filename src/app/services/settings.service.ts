import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * When changing any of these settings, you must subsequently call saveSettings() to apply it to permanent storage.
 */

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  public language: 'en' | 'es';
  public location: {
    countryCode: string;
    stateCode: string;
    savedTime: Date;
  };

  private isReady: boolean = false;
  
  private settingsStorageKey = 'user-settings';

  constructor( private storage: Storage ) {
    this.initSettings();
  }

  async initSettings() {
    // try to restore saved settings
    if ( !await this.loadSettings() ) {
      // apply defaults
      let defaultLang = (window.navigator['userLanguage'] || window.navigator.language).substr( 0, 2 );
      if ( defaultLang !== 'en' && defaultLang !== 'es' ) defaultLang = 'es';

      this.language = defaultLang,
      this.location = {
        countryCode: null,
        stateCode: null,
        savedTime: null
      };

      this.saveSettings();
    }

    this.isReady = true;
  }

  async waitForReady(): Promise<any> {
    let interval;
    return new Promise( (resolve, reject) => {
      interval = setInterval( () => {
        if ( this.isReady ) {
          clearInterval( interval );
          resolve( null );
        }
      }, 100 );
    });
  }

  async saveSettings() {
    // save to storage
    return this.storage.set( this.settingsStorageKey, {
      language: this.language,
      location: this.location
    });
  }

  // returns a promise which resolves with true or false depending on whether settings were loaded successfully
  async loadSettings(): Promise<Boolean> {
    let settings = await this.storage.get( this.settingsStorageKey );
    if ( settings ) {
      // apply settings
      this.language = settings.language;
      this.location = settings.location;
    }
    return !!settings;
  }

}
