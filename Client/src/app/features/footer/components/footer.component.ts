import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent {
  serverStatus$: Observable<string>;

  constructor(store: Store<{ serverStatus: string }>) {
    this.serverStatus$ = store.select(s => s.serverStatus);
  }
}
