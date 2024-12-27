import { Component, OnInit } from '@angular/core';
import { LoaderService } from './Services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Main_Angular_Declarative';
  showLoader$ = this.loader.loadingAction$;
  constructor(private loader: LoaderService) {}
  ngOnInit(): void {
    this.loader.showLoader();
  }
}
