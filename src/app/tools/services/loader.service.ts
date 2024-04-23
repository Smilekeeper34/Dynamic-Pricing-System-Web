import { Injectable, signal } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  count = signal(false);

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    //
  }
  toggle() {
    this.count.update((value) => !value);
  }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
