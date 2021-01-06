import { Component } from '@angular/core';
import { MiscService } from '../../services';
import { version } from '../../../../package.json';

@Component({
  templateUrl: './about-botl.component.html'
})
export class AboutBotlComponent {

  public modal: HTMLIonModalElement;
  public lastYear = ( new Date().getFullYear() ) - 1;
  public version = version;

  constructor( public miscService: MiscService ) { }

}
