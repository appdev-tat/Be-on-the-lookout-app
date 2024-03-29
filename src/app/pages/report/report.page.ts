import { Component } from '@angular/core';
import { Sim } from '@ionic-native/sim/ngx';
import { Device } from '@ionic-native/device/ngx';
import { AlertController } from '@ionic/angular';
import { WhatToReportComponent } from '../../modals';
import { ModalService, MiscService, TrxService } from '../../services';
import { SurveyComponent } from '../../modals';
import { ISurvey, ISurveyField, SurveyFieldType } from '../../models/survey';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GeocoderService } from '../../services/geocoder.service';

interface ILocation { countryCode: string; stateCode: string };

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {

  WhatToReportComponent = WhatToReportComponent;
  hasSim = false;
  redFlagOptions: ISurveyField['options'];

  location: ILocation = { countryCode: null, stateCode: null };
  locationFetched = false;

  location$ = new BehaviorSubject<ILocation>( { countryCode: null, stateCode: null } );
  locationSubscription: Subscription;

  constructor(
    public modalService: ModalService,
    public miscService: MiscService,
    public alertController: AlertController,
    public device: Device,
    private sim: Sim,
    private geocoder: GeocoderService,
    private trxService: TrxService
  ) {
    this.sim.getSimInfo()
    .then( simData => this.hasSim = simData != null && !!simData.carrierName )
    .catch( e => this.hasSim = false );

    // get the user's current country and state
    this.getLocation();
  }

  private _yesNoOptions = [
    { value: 'yes', labelTranslationKey: 'misc.buttons.yes' },
    { value: 'no', labelTranslationKey: 'misc.buttons.no' }
  ];

  async getLocation() {
    this.locationFetched = false;

    const alert = await this.alertController.create({
      backdropDismiss: false,
      cssClass: 'loading-location-alert',
      message: '<ion-spinner class="sc-ion-loading-md md spinner-crescent hydrated" role="progressbar"></ion-spinner> ' +
        ( await this.trxService.t('report.gettingLocation') ) +
        '<br><br>' +
        ( await this.trxService.t('report.gettingLocationWhy') ),
      buttons: [{
        text: await this.trxService.t( 'misc.buttons.cancel' ),
        role: 'cancel',
        handler: () => {
          // cancel the location fetch.
          this.locationSubscription.unsubscribe();
          this.locationFetched = true;
          alert.dismiss();
        }
      }]
    });

    // if the location has been fetched recently, it will take a very short time, resulting in the alert showing for a split second.
    // Avoid this by waiting to show the alert.
    setTimeout( () => {
      if ( !this.locationFetched ) {
        alert.present();
      }
    }, 250 );

    this.locationSubscription = this.location$.subscribe( location => {
      this.location = location;
    });

    this.geocoder.getLocation().then( location => {
      if ( !this.locationFetched ) {
        this.location$.next( location );
        this.locationFetched = true;
        alert.dismiss();
      }
    });
  }

  openEmailReportSurvey() {
    let survey: ISurvey = {
      pages: [
        () => { return {
        // page 1: intro
        topTextTranslationKey: 'emailReport.intro'
      }}, () => { return {
        // page 2: have you seen a victim?
        topTextTranslationKey: 'emailReport.checkboxes.seenVictim',
        fields: [{
          type: SurveyFieldType.CHOICE,
          name: 'hasSeenVictim',
          options: this._yesNoOptions,
          isRequired: true
        }]
      }}, () => { return {
        // page 3: victim details
        isVisible: vals => vals.hasSeenVictim === 'yes',
        fields: [{
          type: SurveyFieldType.SELECT,
          labelTranslationKey: 'emailReport.victim.gender.label',
          name: 'victimGender',
          isRequired: true,
          options: [
            { value: 'Unknown', labelTranslationKey: 'emailReport.victim.gender.unknown' },
            { value: 'Female',  labelTranslationKey: 'emailReport.victim.gender.female' },
            { value: 'Male',    labelTranslationKey: 'emailReport.victim.gender.male' },
            { value: 'Other',   labelTranslationKey: 'emailReport.victim.gender.other' }
          ]
        }, {
          type: SurveyFieldType.TEXTAREA,
          name: 'victimAppearance',
          labelTranslationKey: 'emailReport.victim.appearance.label',
          helperTranslationKey: 'emailReport.victim.appearance.placeholder',
          isRequired: true
        }]
      }}, () => { return {
        // page pre-4: victim details, cont'd
        isVisible: vals => vals.hasSeenVictim === 'yes',
        fields: [{
          type: SurveyFieldType.SELECT,
          labelTranslationKey: 'emailReport.victim.flagType.label',
          name: 'flagType',
          isRequired: true,
          options: [
            { value: 'School', labelTranslationKey: 'emailReport.victim.flagType.school' },
            { value: 'Transit',  labelTranslationKey: 'emailReport.victim.flagType.transit' }
          ]
        }],
        onContinue: async vals => {
          // set the flag options that will show on the next page
          if ( vals.flagType === 'School' ) {
            this.redFlagOptions = [
              { value: 'The student has accumulated frequent absences', labelTranslationKey: 'emailReport.victim.flags.school.absences' },
              { value: 'There has recently been a new or different person dropping off or picking up the student from the bus stop or school', labelTranslationKey: 'emailReport.victim.flags.school.differentPerson' },
              { value: 'The student has signs of bruises, physical trauma, or malnourishment', labelTranslationKey: 'emailReport.victim.flags.school.bruises' },
              { value: 'The student has inappropriate dress for the weather or school', labelTranslationKey: 'emailReport.victim.flags.school.dress' },
              { value: 'The student has symptoms of anger, panic, irritability, phobia, or hyperactivity that weren’t there before', labelTranslationKey: 'emailReport.victim.flags.school.emotions' },
              { value: 'The student exhibits mood swings, such as frequent crying, temper tantrums, or clingy behavior', labelTranslationKey: 'emailReport.victim.flags.school.moodSwings' },
              { value: 'The student has markings or tattoos that could be a pimp’s branding', labelTranslationKey: 'emailReport.victim.flags.school.branding' },
              { value: 'The student suddenly has the latest gadgets, new clothes, manicured nails, or other material possessions that a pimp may have given them during a grooming process', labelTranslationKey: 'emailReport.victim.flags.school.gadgets' },
              { value: 'The student shows acknowledgement that they have a pimp and/or are making a quota', labelTranslationKey: 'emailReport.victim.flags.school.quota' }
            ];
          } else if ( vals.flagType === 'Transit' ) {
            this.redFlagOptions = [
              { value: 'The victim is not allowed to speak for himself/herself', labelTranslationKey: 'emailReport.victim.flags.transit.noSpeak' },
              { value: 'The victim’s tickets or identification documents are being controlled by another person', labelTranslationKey: 'emailReport.victim.flags.transit.tickets' },
              { value: 'The victim shows acknowledgement of a pimp or making a quota', labelTranslationKey: 'emailReport.victim.flags.transit.quota' },
              { value: 'The victim is a minor traveling without adult supervision', labelTranslationKey: 'emailReport.victim.flags.transit.minor' },
              { value: 'The victim is a minor who does not know the person who is picking them up at their destination', labelTranslationKey: 'emailReport.victim.flags.transit.minorPickUp' },
              { value: 'The victim has never met the person who purchased their ticket for them', labelTranslationKey: 'emailReport.victim.flags.transit.strangerPurchase' },
              { value: 'The victim has bruising, branding or signs of physical trauma', labelTranslationKey: 'emailReport.victim.flags.transit.bruising' },
              { value: 'The victim looks dirty and disheveled, or seems confused, panicked, or afraid', labelTranslationKey: 'emailReport.victim.flags.transit.emotions' },
              { value: 'The victim is offering to exchange sex for money or any other good or service', labelTranslationKey: 'emailReport.victim.flags.transit.offeringSex' }
            ];
          } else {
            this.redFlagOptions = [];
          }
          return true;
        }
      }}, () => { return {
        // page 4: victim details, cont'd
        isVisible: vals => vals.hasSeenVictim === 'yes',
        topTextTranslationKey: 'emailReport.victim.flags.label',
        fields: [{
          type: SurveyFieldType.CHOICE,
          name: 'victimFlags',
          multi: true,
          options: this.redFlagOptions
        }, {
          type: SurveyFieldType.TEXTAREA,
          name: 'victimFlagsOther',
          labelTranslationKey: 'emailReport.victim.otherNotes.label'
        }]
      }}, () => { return {
        // page 5: Do you see other people?
        topTextTranslationKey: 'emailReport.checkboxes.otherPeople',
        fields: [{
          type: SurveyFieldType.CHOICE,
          name: 'hasSeenOtherPeople',
          options: this._yesNoOptions,
          isRequired: true
        }]
      }}, () => { return {
        // page 6: Other people details
        isVisible: vals => vals.hasSeenOtherPeople === 'yes',
        topTextTranslationKey: 'emailReport.otherPeople.placeholder',
        fields: [{
          type: SurveyFieldType.TEXTAREA,
          name: 'otherPeopleDetails',
          labelTranslationKey: 'emailReport.otherPeople.label'
        }]
      }}, () => { return {
        // page 7: Are there vehicles?
        topTextTranslationKey: 'emailReport.checkboxes.cars',
        fields: [{
          type: SurveyFieldType.CHOICE,
          name: 'thereAreCars',
          options: this._yesNoOptions,
          isRequired: true
        }]
      }}, () => { return {
        // page 8: cars details
        isVisible: vals => vals.thereAreCars === 'yes',
        topTextTranslationKey: 'emailReport.cars.placeholder',
        fields: [{
          type: SurveyFieldType.TEXTAREA,
          name: 'carDetails',
          labelTranslationKey: 'emailReport.otherPeople.label'
        }]
      }}, () => { return {
        // page 9: when
        topTextTranslationKey: 'emailReport.when.label',
        fields: [{
          type: SurveyFieldType.DATE,
          name: 'date',
          labelTranslationKey: 'misc.datetime.date',
          isRequired: true
        }, {
          type: SurveyFieldType.TIME,
          name: 'time',
          labelTranslationKey: 'misc.datetime.time',
          isRequired: true
        }]
      }}, () => { return {
        // page 10: where
        topTextTranslationKey: 'emailReport.where.label',
        fields: [{
          type: SurveyFieldType.TEXTAREA,
          name: 'location',
          isRequired: true
        }]
      }}, () => { return {
        // page 11: other
        topTextTranslationKey: 'emailReport.additional.label',
        fields: [{
          type: SurveyFieldType.TEXTAREA,
          name: 'additional'
        }]
      }}, () => { return {
        // page 12: phone
        topTextTranslationKey: 'emailReport.phone.label',
        fields: [{
          type: SurveyFieldType.TEL,
          name: 'phone',
          isRequired: true
        }]
      }}, () => { return {
        // page 13: end
        topTextTranslationKey: 'emailReport.notes'
      }}],
      submitButtonTranslationKey: 'emailReport.emailButton',
      onSubmit: vals => {
        const subject = 'Trafficking tip';
        let body = '';

        if ( vals.hasSeenVictim === 'yes' ) {
          body += `I've come into contact with a victim.\n`
            + `Victim's gender: ${vals.victimGender}\n`
            + `Victim's appearance: ${vals.victimAppearance}\n`
            + `${vals.victimFlags}; ${vals.victimFlagsOther}\n\n`;
        }
    
        if ( vals.hasSeenOtherPeople === 'yes' ) {
          body += `There were people other than victims involved.\n`
            + `${vals.otherPeopleDetails}\n\n`;
        }
    
        if ( vals.thereAreCars === 'yes' ) {
          body += `Vehicles were involved.\n`
            + `${vals.carDetails}\n\n`;
        }

        // parse date/time info
        let date = new Date( vals.date );
        let timeSplit = vals.time.split(':');
        date.setHours( parseInt(timeSplit[0]) );
        date.setMinutes( parseInt(timeSplit[1]) );
        const outputDate = date.toLocaleDateString();
        const outputTime = date.toLocaleTimeString();
        body += `The suspicious activity happened on ${outputDate}, ${outputTime}, at ${vals.location}.\n\n`;

        if ( vals.additional ) {
          body += `Additional information:\n`
            + `${vals.additional}\n\n`;
        }
    
        body += `My phone number: ${vals.phone}`;
    
        this.miscService.openExternalLink(
            'mailto:help@humantraffickinghotline.org?subject=' +
            encodeURIComponent(subject) +
            '&body=' +
            encodeURIComponent(body)
        );

        return new Promise( (resolve,reject) => resolve(undefined) );
      }
    };
    
    this.modalService.open( SurveyComponent, {
      titleTranslationKey: 'emailReport.title',
      successTranslationKey: '',
      survey: survey,
      onSuccess: () => {}
    });

  }

  openLocationSettings() {
    if ( window.cordova && window.cordova.plugins['settings'] ) {
      window.cordova.plugins['settings'].open( 'application_details', () => {}, () => {} );
    }
  }
}
