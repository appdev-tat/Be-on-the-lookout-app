import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalService, MiscService } from '../../services';
import { GenericModalComponent } from '../../modals';

@Component({
  selector: 'app-red-flags-transit',
  templateUrl: './red-flags-transit.page.html',
  styleUrls: ['./red-flags-transit.page.scss'],
})
export class RedFlagsTransitPage implements OnInit {

  GenericModalComponent = GenericModalComponent;

  constructor( public navCtrl: NavController, public modalService: ModalService, public miscService: MiscService ) { }

  ngOnInit() {
  }

}
