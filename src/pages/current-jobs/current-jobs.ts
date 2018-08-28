import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Observable} from "rxjs";
import {AngularFirestoreCollection} from "angularfire2/firestore";
import {map} from "rxjs/operators";
import {FirebaseAuthService} from "../firebase-integration/firebase-auth.service";
import {JobDetailsSkeletonPage} from "../job-details-skeleton/job-details-skeleton";

/**
 * Generated class for the CurrentJobsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-current-jobs',
  templateUrl: 'current-jobs.html',
})
export class CurrentJobsPage {
  jobAcceptCollection: AngularFirestoreCollection<any>;
  jobAccept: Observable<any[]>;
  clientId: string;
  clientRef: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: DatabaseProvider,
    private authService: FirebaseAuthService
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter PendingJobsPage');
    this.authService.getCurrentUser().then(user => {
      this.clientId = user.uid;
      // Get client reference
      this.clientRef = DatabaseProvider.getClientProfileRef(this.clientId);
      this.jobAcceptCollection = this.db.queryJobAccept(
        ref => ref.where('clientRef', '==', this.clientRef)
      );
      this.jobAccept = this.jobAcceptCollection
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

  goToJobRequestDetail(requestId: string) {
    this.navCtrl.push(
      JobDetailsSkeletonPage,
      {
        requestId,
        pending: false
      },
    );
  }

}
