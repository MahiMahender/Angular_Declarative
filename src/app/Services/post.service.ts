import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../Models/IPost';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<{ [id: string]: IPost }>(
        'https://angular-rxjs-declarative-posts-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(map((data) => console.log(data)));
  }
}
