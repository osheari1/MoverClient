import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import DocumentReference = firebase.firestore.DocumentReference;

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(
    public afs: AngularFirestore) {
  }

  createClientProfile(email: string, id: string): Promise<any> {
    return this.afs.doc(`/clientProfile/${id}`).set({
      email: email,
      id: id
    })
  }


  submitJobRequest(data): Promise<DocumentReference> {
    return this.afs.collection('/jobRequests').add(data)
  }

  lookupClientProfile(id): Promise<AngularFirestoreDocument<any>> {
    return new Promise<AngularFirestoreDocument<any>>((resolve, reject) => {
      let docRef: AngularFirestoreDocument<any> = this.afs.doc<any>(
        `/clientProfile/${id}`);
      if (docRef) {
        resolve(docRef);
      } else {
        reject(docRef);
      }
    });
  }

  queryJobRequests(queryFnc = null): AngularFirestoreCollection<any> {
    if (queryFnc != null) {
      return this.afs.collection('jobRequests', queryFnc);
    }
    return this.afs.collection('jobRequests');
  }

  lookupClientProfile2(id: string): AngularFirestoreDocument<any> {
    return this.afs.collection('clientProfile').doc(`${id}`)
  }

  getClientProfileRef(id: string): DocumentReference {
    return firebase.firestore().collection('clientProfile').doc(`${id}`);
  }



}
