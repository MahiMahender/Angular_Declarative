import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/Models/IPost';
import { DeclarativePostsService } from 'src/app/Services/declarative-posts.service';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AltPostsComponent implements OnInit {
  posts$ = this.postsService.postsWithCategory$;
  constructor(private postsService: DeclarativePostsService) {}

  ngOnInit(): void {}

  onPostSelect(post: IPost, event: Event) {
    event.preventDefault();
    console.log(post);
    post.id && this.postsService.selectedPostId(post.id);
  }
}
