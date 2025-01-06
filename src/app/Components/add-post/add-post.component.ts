import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DeclarativeCategoryService } from 'src/app/Services/declarative-category.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent implements OnInit {
  constructor(private categoryService: DeclarativeCategoryService) {}

  ngOnInit(): void {}

  categories$ = this.categoryService.categories$;

  addPostForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(''),
  });

  onAddPost() {
    console.log(this.addPostForm.value);
  }
}
