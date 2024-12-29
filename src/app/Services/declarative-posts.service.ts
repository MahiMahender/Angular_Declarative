import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  catchError,
  delay,
  exhaustMap,
  map,
  share,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { IPost } from '../Models/IPost';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { DeclarativeCategoryService } from './declarative-category.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class DeclarativePostsService implements OnInit {
  constructor(
    private http: HttpClient,
    private categories: DeclarativeCategoryService,
    private loader: LoaderService
  ) {
    this.loader.showLoader();
  }
  ngOnInit(): void {
    this.loader.showLoader();
  }

  posts$ = this.http
    .get<{ [id: string]: IPost }>(
      'https://angular-rxjs-declarative-posts-default-rtdb.firebaseio.com/posts.json'
    )
    .pipe(
      tap((data) => {
        this.loader.hideLoader();
      }),
      map((postData) => {
        let post: IPost[] = [];
        for (let id in postData) {
          post.push({ ...postData[id], id });
        }
        return post;
      }),
      catchError(this.handleError),
      share()
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
    }),
    catchError(this.handleError)
  );

  private selectedPostSubject = new BehaviorSubject<string>('');
  selectedPostAction$ = this.selectedPostSubject.asObservable();

  selectedPostId(postId: string) {
    this.selectedPostSubject.next(postId);
  }

  post$ = combineLatest([
    this.postsWithCategory$,
    this.selectedPostAction$,
  ]).pipe(
    map(([posts, selectedPostId]) => {
      return posts.find((post) => post.id == selectedPostId);
    }),
    catchError(this.handleError)
  );
  handleError(error: Error) {
    return throwError(() => {
      return 'Unknow error occured.please try again';
    });
  }
}
