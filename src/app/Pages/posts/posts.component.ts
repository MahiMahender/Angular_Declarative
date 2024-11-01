import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/Models/IPost';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  postData: IPost[] = [];
  postsSubscription!: Subscription;
  constructor(
    private postService: PostService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    /* this.postsSubscription = this.postService.getPosts().subscribe((data) => {
      this.postData = data;
    }); */
    this.postsSubscription = this.postService
      .getPostsWithCategories()
      .subscribe((data) => {
        this.postData = data;
        this.ref.detectChanges();
      });
  }
  ngOnDestroy(): void {
    this.postsSubscription && this.postsSubscription.unsubscribe();
  }
}
