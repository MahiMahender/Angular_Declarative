import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../Models/IPost';
import { map, mergeMap } from 'rxjs/operators';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private categories: CategoryService) {}

  getPosts() {
    return this.http
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

  getPostsWithCategories() {
    return this.getPosts().pipe(
      mergeMap((postData) => {
        return this.categories.getCategoryData().pipe(
          map((Categories) => {
            return postData.map((post) => {
              return {
                ...post,
                categoryName: Categories.find(
                  (category) => category.id === post.categoryid
                )?.title,
              };
            });
          })
        );
      })
    );
  }
}
