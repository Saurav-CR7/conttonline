import { CategoryService } from 'shared/services/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  categories$;
  @Input('forValue') forValue;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }

}
