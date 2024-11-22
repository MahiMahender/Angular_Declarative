import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ICategory } from '../Models/ICategory';

@Injectable({
  providedIn: 'root',
})
export class DeclarativeCategoryService {
  constructor(private http: HttpClient) {}
}
