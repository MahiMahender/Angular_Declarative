import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './Pages/posts/posts.component';
import { HomeComponent } from './Pages/home/home.component';
import { DeclarativePostsComponent } from './Pages/declarative-posts/declarative-posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'declarativePosts', component: DeclarativePostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
