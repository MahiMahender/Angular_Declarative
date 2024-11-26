import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, combineLatest, forkJoin, map } from 'rxjs';
import { IPost } from 'src/app/Models/IPost';
import { DeclarativeCategoryService } from 'src/app/Services/declarative-category.service';
import { DeclarativePostsService } from 'src/app/Services/declarative-posts.service';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarativePostsComponent implements OnInit {
  posts$ = this.postsService.posts$;
  postsWithCategory$ = this.postsService.postsWithCategory$;

  selctedCategoryId = 'Id_1';

  filteredPostsUsingCategoryId$ = this.postsWithCategory$.pipe(
    map((posts) => {
      return posts.filter((post) => post.categoryid == this.selctedCategoryId);
    })
  );

  constructor(private postsService: DeclarativePostsService) {}
  ngOnInit(): void {}
}
