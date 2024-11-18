import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPost } from '../Models/IPost';

@Injectable({
  providedIn: 'root',
})
export class DeclarativePostsService {
  constructor(private http: HttpClient) {}

  posts$ = this.http
    .get<{ [id: string]: IPost }>(
      'https://angular-rxjs-declarative-posts-default-rtdb.firebaseio.com/posts.json'
    )
    .pipe(
      map((postData) => {
        let post: IPost[] = [];
        for (let id in postData) {
          post.push({ ...postData[id], id });
        }
        return post;
      })
    );
}
