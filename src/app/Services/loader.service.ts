import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSubject = new Subject<boolean>();
  loadingAction$ = this.loadingSubject.asObservable();

  constructor() {}

  showLoader() {
    this.loadingSubject.next(true);
    console.log('true');
  }
  hideLoader() {
    this.loadingSubject.next(false);
    console.log('false');
  }
}
