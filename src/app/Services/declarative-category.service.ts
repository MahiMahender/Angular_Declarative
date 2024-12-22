import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, share, shareReplay } from 'rxjs';
import { ICategory } from '../Models/ICategory';

@Injectable({
  providedIn: 'root',
})
export class DeclarativeCategoryService {
  categories$ = this.http
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
      }),
      share()
    );
  constructor(private http: HttpClient) {}
}
