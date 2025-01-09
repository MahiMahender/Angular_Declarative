import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPost } from 'src/app/Models/IPost';
import { DeclarativeCategoryService } from 'src/app/Services/declarative-category.service';
import { DeclarativePostsService } from 'src/app/Services/declarative-posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent implements OnInit {
  constructor(
    private categoryService: DeclarativeCategoryService,
    private postService: DeclarativePostsService
  ) {}

  ngOnInit(): void {}

  categories$ = this.categoryService.categories$;

  addPostForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    categoryid: new FormControl(''),
  });

  onAddPost() {
    this.postService.addPost(this.addPostForm.value as IPost);
  }
}
