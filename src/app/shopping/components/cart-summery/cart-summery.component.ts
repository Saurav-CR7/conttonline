import { ShoppingCart } from 'shared/models/shoppingCart';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-summery',
  templateUrl: './cart-summery.component.html',
  styleUrls: ['./cart-summery.component.css']
})
export class CartSummeryComponent {
  @Input('cart') cart: ShoppingCart;
}
