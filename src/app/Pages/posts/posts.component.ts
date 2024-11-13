import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
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
  intervalSubscription!: Subscription;
  constructor(
    private postService: PostService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    /* this.postsSubscription = this.postService.getPosts().subscribe((data) => {
      this.postData = data;
    }); */
    this.intervalSubscription = interval(1000).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('intervel completed');
      },
    });
    this.postsSubscription = this.postService
      .getPostsWithCategories()
      .subscribe({
        next: (data) => {
          this.postData = data;
          this.ref.detectChanges();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('completed HTTP Call');
        },
      });
  }
  ngOnDestroy(): void {
    this.postsSubscription && this.postsSubscription.unsubscribe();
    this.intervalSubscription && this.intervalSubscription.unsubscribe();
  }
}
