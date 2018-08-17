import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product, images: FileList, coverImage: File) {
    const producSub = this.db.list('/product').push(product);
    let imageUrl = [];

    producSub.then((snap) => {
      for (let i = 0; i < images.length; i++) {
        let image = images[i];
        const metaData = { 'contentType': image.type };
        const storageRef: firebase.storage.Reference = firebase.storage().ref(`/photo/${snap.key}/${image.name}`);
        const uploadTask: firebase.storage.UploadTask = storageRef.put(image, metaData);

        uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
          imageUrl.push({ 'name': image.name, 'url': uploadSnapshot.downloadURL });
          console.log('Upload of ' + i + 'th image completed');
          if (imageUrl.length === images.length) {
            firebase.database().ref(`/product/${snap.key}/imageUrl/`).set(imageUrl);
            this.uploadCoverImage(coverImage, snap);
          }
        });
      }
    });
  }

  private uploadCoverImage(image, snap) {
    const metaData = { 'contentType': image.type };
    const storageRef: firebase.storage.Reference = firebase.storage().ref(`/photo/${snap.key}/${image.name}`);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(image, metaData);

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      let imageData = { 'name': image.name, 'url': uploadSnapshot.downloadURL };
      console.log('Upload of cover image completed');
      if (imageData.url) {
        firebase.database().ref(`/product/${snap.key}/coverUrl/`).set(imageData);
      }
    });
  }

  getAll() {
    return this.db.list('/product');
  }

  getProduct(productID) {
    return this.db.object('/product/' + productID);
  }

  updateProduct(productID, product) {
    return this.db.object('/product/' + productID).update(product);
  }

  deleteProduct(productID) {
    const sub = this.db.list('product/' + productID + '/imageUrl');
    let count = 0;

    sub.forEach(items  => {
      items.forEach(item => {
        count++;
        const deleteTask = firebase.storage().ref(`/photo/${productID}/${item.name}`).delete();
        deleteTask.then(() => {
          if (count === items.length) {
            this.db.object('/product/' + productID).remove();
          }
        });
      });
    });
  }

  searchProduct(start, end): FirebaseListObservable<any> {
    return this.db.list('/product', {
      query: {
        orderByChild: 'title',
        startAt: start,
        endAt: end
      }
    });
  }
}
