import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
  selectedCategorySubject = new Subject<string>();
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();

  posts$ = this.postsService.posts$;
  categories$ = this.categoriesService.categories$;
  postsWithCategory$ = this.postsService.postsWithCategory$;

  selctedCategoryId = '';
  filteredPostsUsingCategoryId$ = this.postsWithCategory$.pipe(
    map((posts) => {
      return posts.filter((post) =>
        this.selctedCategoryId
          ? post.categoryid === this.selctedCategoryId
          : true
      );
    })
  );

  constructor(
    private postsService: DeclarativePostsService,
    private categoriesService: DeclarativeCategoryService
  ) {}
  ngOnInit(): void {}

  onCategoryChange(event: Event) {
    let selectedId = (event.target as HTMLSelectElement).value;
    this.selectedCategorySubject.next(selectedId);
  }
}
