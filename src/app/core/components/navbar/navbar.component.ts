import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Observable } from 'rxjs/Observable';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shoppingCart';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  products;
  searchString: string;
  startAt = new Subject();
  endAt = new Subject();
  men;
  women;
  objectKeys = Object.keys;

  constructor(private auth: AuthService,
    private cartService: ShoppingCartService,
    private productService: ProductService,
    private categoryService: CategoryService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
    this.productService.searchProduct(this.startAt, this.endAt)
        .subscribe(products => {
            this.products = products,
            console.log(this.products);
        });

    let category$ = this.categoryService.getAll();
    category$.subscribe(snap => {
      this.men = snap[0].categories;
      this.women = snap[1].categories;
    });
  }

  searchProduct() {
    this.startAt.next(this.searchString);
    // tslint:disable-next-line:quotemark
    this.endAt.next(this.searchString + "\uf8ff");
  }

  logout() {
    this.auth.logout();
  }


  addClass(event) {
    let id = event.target.id;
    if (id === 'menDrop') {
      document.getElementById(id).classList.add('showBarRed');
    } else {
      document.getElementById(id).classList.add('showBarPink');
    }
  }

  removeClass(event) {
    let id = event.target.id;
    if (id === 'menDrop') {
      document.getElementById(id).classList.remove('showBarRed');
    } else {
      document.getElementById(id).classList.remove('showBarPink');
    }
  }
}
