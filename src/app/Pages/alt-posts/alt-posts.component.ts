import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';
import { IPost } from 'src/app/Models/IPost';
import { DeclarativePostsService } from 'src/app/Services/declarative-posts.service';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AltPostsComponent implements OnInit {
  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  selectedPost$ = this.postsService.post$;

  posts$ = this.postsService.postsWithCategory$.pipe(
    catchError((error) => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );
  constructor(private postsService: DeclarativePostsService) {}

  ngOnInit(): void {}

  onPostSelect(post: IPost, event: Event) {
    event.preventDefault();
    post.id && this.postsService.selectedPostId(post.id);
  }
}
