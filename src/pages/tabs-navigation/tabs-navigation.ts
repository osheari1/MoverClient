import { Component } from '@angular/core';
import { MapsPage } from '../maps/maps';
import {PendingJobsPage} from "../pending-jobs/pending-jobs";
import {CurrentJobsPage} from "../current-jobs/current-jobs";

// import {EquipmentOptionsPage} from "../equipment-options/equipment-options";

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    // this.tab1Root = ListingPage;
    // this.tab1Root = RequestDetailsPage;
    this.tab1Root = PendingJobsPage;
    // this.tab1Root = EquipmentOptionsPage;
    this.tab2Root = MapsPage;
    this.tab3Root = CurrentJobsPage;
  }
}
