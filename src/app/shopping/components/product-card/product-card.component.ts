import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shoppingCart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: any;
  @Input('shoppingCart') shoppingCart: ShoppingCart;
  images = [];
  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  ngOnInit() {
    if (this.product) {
      for (let i = 1; i < this.product.imageUrl.length; i++) {
        this.images.push(this.product.imageUrl[i].url);
      }
    }
  }

}
