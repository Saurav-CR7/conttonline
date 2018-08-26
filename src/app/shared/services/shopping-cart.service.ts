import { Observable } from 'rxjs/Observable';
import { Product } from 'shared/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { ShoppingCart } from 'shared/models/shoppingCart';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x));
  }

  async addToCart(product: Product, size: string) {
    this.updateItem(product, 1, size);
  }

  async removeFromCart(product: Product, size: string) {
    this.updateItem(product, -1, size);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('shopping-carts/' + cartId + '/').remove();

  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string, size: string) {
    return this.db.object('/shopping-carts/' + cartId + '/' + size + '/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number, size: string) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key, size);
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;

      if (quantity === 0) {
        item$.remove();
      } else {
        item$.update({
          brand: product.brand,
          title: product.title,
          coverUrl: product.coverUrl,
          price: product.price,
          size: size,
          quantity: quantity
        });
      }
    });
  }
}
