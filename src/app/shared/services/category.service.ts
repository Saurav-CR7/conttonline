import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categoryTable', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getCategories(forValue) {
    const location: string = '/categoryTable/' + forValue + '/categories';
    return this.db.list(location, {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getSubCategories(forValue, categoryValue) {
    const location: string = '/categoryTable/' + forValue + '/categories/' + categoryValue + '/subCategories';
    return this.db.list(location, {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
