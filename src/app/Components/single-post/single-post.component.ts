import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DeclarativePostsService } from 'src/app/Services/declarative-posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent implements OnInit {
  constructor(private postService: DeclarativePostsService) {}
  post$ = this.postService.post$;
  ngOnInit(): void {}
}
