import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { PostsComponent } from './Pages/posts/posts.component';
import { HomeComponent } from './Pages/home/home.component';
import { DeclarativePostsComponent } from './Pages/declarative-posts/declarative-posts.component';
import { AltPostsComponent } from './Pages/alt-posts/alt-posts.component';
import { SinglePostComponent } from './Components/single-post/single-post.component';
import { LoadingComponent } from './Components/loading/loading.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PostsComponent, HomeComponent, DeclarativePostsComponent, AltPostsComponent, SinglePostComponent, LoadingComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
