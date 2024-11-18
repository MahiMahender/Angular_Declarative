import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DeclarativePostsService } from 'src/app/Services/declarative-posts.service';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarativePostsComponent implements OnInit {
  posts$ = this.postsService.posts$;
  constructor(private postsService: DeclarativePostsService) {}
  ngOnInit(): void {}
}
