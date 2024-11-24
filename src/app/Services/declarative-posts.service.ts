import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, exhaustMap, map } from 'rxjs/operators';
import { IPost } from '../Models/IPost';
import { combineLatest, forkJoin, of } from 'rxjs';
import { DeclarativeCategoryService } from './declarative-category.service';

@Injectable({
  providedIn: 'root',
})
export class DeclarativePostsService {
  constructor(
    private http: HttpClient,
    private categories: DeclarativeCategoryService
  ) {}

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
  postsWithCategory$ = forkJoin([
    this.posts$,
    this.categories.categories$,
  ]).pipe(
    map(([posts, categories]) => {
      return posts.map((post) => {
        return {
          ...post,
          categoryName: categories.find(
            (category) => post.categoryid === category.id
          )?.title,
        } as IPost;
      });
    })
  );
}
