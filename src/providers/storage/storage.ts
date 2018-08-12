import {Injectable} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "angularfire2/storage";

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(
    public afStorage: AngularFireStorage,
  ) {
    console.log('Hello StorageProvider Provider');
  }

  uploadJobRequestImage(jobRequestId: string, imageURL: string): AngularFireUploadTask {
    const storageRef: AngularFireStorageReference = this.afStorage.ref(
      `jobRequestImages/${jobRequestId}/`);
    return storageRef.putString(imageURL, 'base64', {
      contentType: 'image/png'
    });
  }

}
