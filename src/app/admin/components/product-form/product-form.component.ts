import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  for$;
  subCategory$;
  selectedFor;
  product = {
    'brand': '',
    'title': '',
    'price': '',
    'description': '',
    'for': '',
    'category': '',
    'subCategory': '',
    'imageUrl': ''};
  id;
  photoFiles: FileList;
  coverImage: File;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {

      this.for$ = this.categoryService.getAll();

      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.id) {
        this.productService.getProduct(this.id).take(1).subscribe(p => this.product = p);
      }
  }

  save() {
    console.log(this.product);
    if (this.id) {
      this.productService.updateProduct(this.id, this.product);
    } else {
      this.productService.create(this.product, this.photoFiles, this.coverImage);
    }
    this.router.navigate(['/admin/product']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/product']);
    } else { return; }
  }

  photoSelected(event: any, flag: string) {

    const files = event.target.files;

    if (flag === 'coverImage') {
      this.coverImage = files[0];
      document.getElementById('imageUrl').removeAttribute('disabled');
    } else {
      this.photoFiles = files;
    }
  }

  forSelected(forValue) {
    this.selectedFor = forValue;
    document.getElementById('category').removeAttribute('disabled');
    this.categories$ = this.categoryService.getCategories(forValue);
  }

  categorySelected(categoryValue) {
    document.getElementById('subCategory').removeAttribute('disabled');
    this.subCategory$ = this.categoryService.getSubCategories(this.selectedFor, categoryValue);
  }

}
