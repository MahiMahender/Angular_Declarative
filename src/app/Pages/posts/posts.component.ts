import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/Models/IPost';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  postData: IPost[] = [];
  postsSubscription!: Subscription;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postsSubscription = this.postService.getPosts().subscribe((data) => {
      this.postData = data;
    });
  }
  ngOnDestroy(): void {
    this.postsSubscription && this.postsSubscription.unsubscribe();
  }
}
