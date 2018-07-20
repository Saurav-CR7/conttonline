import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/product').push(product);
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
    return this.db.object('/product/' + productID).remove();
  }
}
