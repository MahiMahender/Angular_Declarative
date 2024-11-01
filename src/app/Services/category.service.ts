import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICategory } from '../Models/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategoryData() {
    return this.http
      .get<{ [id: string]: ICategory }>(
        'https://angular-rxjs-declarative-posts-default-rtdb.firebaseio.com/Categories.json'
      )
      .pipe(
        map((categoriesData) => {
          let categories: ICategory[] = [];
          for (let id in categoriesData) {
            categories.push({ ...categoriesData[id], id });
          }
          return categories;
        })
      );
  }
}
