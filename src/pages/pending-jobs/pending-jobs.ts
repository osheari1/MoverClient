import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {DatabaseProvider} from "../../providers/database/database";
import {FirebaseAuthService} from "../firebase-integration/firebase-auth.service";
import {map} from "rxjs/operators";
import {JobDetailsSkeletonPage} from "../job-details-skeleton/job-details-skeleton";

/**
 * Generated class for the PendingJobsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-jobs',
  templateUrl: 'pending-jobs.html',
})
export class PendingJobsPage {

  jobRequestsCollection: AngularFirestoreCollection<any>;
  jobRequests: Observable<any[]>;
  clientId: string;
  clientRef: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: DatabaseProvider,
    private authService: FirebaseAuthService
  ) {
  }

  goToJobRequestDetail(requestId: string) {
    this.navCtrl.push(
      JobDetailsSkeletonPage,
      {
        requestId,
        pending: true
      }
    );
  }


  ionViewWillEnter() {
    console.log('ionViewDidLoad PendingJobsPage');
    this.authService.getCurrentUser().then(user => {
      this.clientId = user.uid;
      //Get client reference
      this.clientRef = DatabaseProvider.getClientProfileRef(this.clientId);
      this.jobRequestsCollection = this.db.queryJobRequests(
        ref => ref.where('clientRef', '==', this.clientRef)
      );
      this.jobRequests = this.jobRequestsCollection
        .snapshotChanges()
        .pipe(
          map(actions => actions.map(
            a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data};
            })));
    });
  }

}
