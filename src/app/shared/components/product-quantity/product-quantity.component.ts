import { ShoppingCart } from 'shared/models/shoppingCart';
import { Product } from 'shared/models/product';
import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: any;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(size) {
    this.cartService.addToCart(this.product, size);
  }

  removeFromCart(size) {
    this.cartService.removeFromCart(this.product, size);
  }
}
