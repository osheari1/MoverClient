import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the JobDetailsSkeletonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-details-skeleton',
  templateUrl: 'job-details-skeleton.html',
})
export class JobDetailsSkeletonPage {
  driverData$: any;
  requestData$: any;
  messageData: any;
  pending: boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider
  ) {
    this.messageData = navParams.data;
    this.pending = this.navParams.data.pending ? this.navParams.data.pending : false
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter JobDetailsSkeletonPage');
    if (this.pending) {
      this.requestData$ = this.db.queryJobRequestDetails(this.messageData.requestId).valueChanges();
    } else {
      this.requestData$ = this.db.queryJobAcceptDetails(this.messageData.requestId).valueChanges();
      this.requestData$.subscribe(doc => {
        this.driverData$ = this.db.lookupDriverProfile(doc.driverId).valueChanges();

      });
    }
  }


}
