import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  AboutBotlComponent,
  RecommendedBooksComponent,
  HumanTraffickingLawsComponent,
  VideosComponent,
  PodcastsComponent
} from '../../modals/';
import { ModalService } from '../../services';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {

  constructor( public modalService: ModalService, public navCtrl: NavController ) { }

  AboutBotlComponent = AboutBotlComponent;
  RecommendedBooksComponent = RecommendedBooksComponent;
  HumanTraffickingLawsComponent = HumanTraffickingLawsComponent;
  VideosComponent = VideosComponent;
  PodcastsComponent = PodcastsComponent;

  ngOnInit() {
  }

}
