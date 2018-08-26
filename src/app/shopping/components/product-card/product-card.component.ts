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
  @Input('productId') productId: any;
  images = [];
  sizes = [];
  showNavigationArrows = false;
  showNavigationIndicators = false;
  isActionVisible = false;
  objectKeys = Object.keys;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(size) {
    this.cartService.addToCart(this.product, size);
  }

  ngOnInit() {
    if (this.product) {
      for (let i = 1; i < this.product.imageUrl.length; i++) {
        this.images.push(this.product.imageUrl[i].url);
      }

      for (let i = 0; i < this.product.sizes.length; i++) {
        this.sizes.push(this.product.sizes[i].toUpperCase());
      }
    }
  }

  showAction() {
    document.getElementById('title' + this.productId).style.display = 'none';
    document.getElementById('add' + this.productId).style.display = 'block';
    document.getElementById('size' + this.productId).style.display = 'block';
  }

  hideAction() {
    if (this.isActionVisible === false) {
      document.getElementById('title' + this.productId).style.display = 'block';
      document.getElementById('add' + this.productId).style.display = 'none';
      document.getElementById('size' + this.productId).style.display = 'none';
    }
  }

  openSizeSelector() {
    this.isActionVisible = true;
    let id = 'sizeSelect' + this.productId;
    document.getElementById(id).style.top = '5rem';
    document.getElementById(id).style.visibility = 'visible';
    document.getElementById(id).style.zIndex = '1';
    setTimeout(() => {
      document.getElementById(id).style.backgroundColor = 'white';
      document.getElementById('sizeHeader' + this.productId).style.visibility = 'visible';
    }, 25);

    setTimeout(() => {
      document.getElementById('sizeContainer' + this.productId).style.display = 'block';
    }, 150);
  }

  closeSizeSelector() {
    let id = 'sizeSelect' + this.productId;
    this.hideSizeSelector(id).then(res => {
        document.getElementById(id).style.zIndex = '-1';
        document.getElementById(id).style.top = '100%';
        document.getElementById('sizeContainer' + this.productId).style.display = 'none';
        document.getElementById(id).style.backgroundColor = '#e0f2f1';
    });
    this.isActionVisible = false;
  }

  private hideSizeSelector(id) {
    return new Promise<any>((resolve) => {
      document.getElementById(id).style.visibility = 'hidden';
      document.getElementById('sizeHeader' + this.productId).style.visibility = 'hidden';
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
  }

}
