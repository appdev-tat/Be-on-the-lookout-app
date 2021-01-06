import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalService, MiscService } from '../../services';
import { GenericModalComponent } from '../../modals';

@Component({
  selector: 'app-red-flags-school',
  templateUrl: './red-flags-school.page.html',
  styleUrls: ['./red-flags-school.page.scss'],
})
export class RedFlagsSchoolPage implements OnInit {

  GenericModalComponent = GenericModalComponent;

  constructor( public navCtrl: NavController, public modalService: ModalService, public miscService: MiscService ) { }

  ngOnInit() {
  }

}
