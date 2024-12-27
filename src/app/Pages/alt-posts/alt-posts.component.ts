import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, tap } from 'rxjs';
import { IPost } from 'src/app/Models/IPost';
import { DeclarativePostsService } from 'src/app/Services/declarative-posts.service';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AltPostsComponent implements OnInit {
  constructor(private postsService: DeclarativePostsService) {}
  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  selectedPost$ = this.postsService.post$.pipe(
    tap((data) => {
      console.log('firing');
    })
  );

  posts$ = this.postsService.postsWithCategory$.pipe(
    tap((posts) => {
      posts[0].id && this.postsService.selectedPostId(posts[0].id);
    }),
    catchError((error) => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );

  ngOnInit(): void {}

  onPostSelect(post: IPost, event: Event) {
    event.preventDefault();
    post.id && this.postsService.selectedPostId(post.id);
  }
}
