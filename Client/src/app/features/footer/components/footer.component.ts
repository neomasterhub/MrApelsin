import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ServerStatusModel } from '../../server-connection/models/server-status.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent {
  serverStatus$: Observable<string>;

  constructor(store: Store<{ serverStatus: ServerStatusModel }>) {
    this.serverStatus$ = store.select(s => ServerStatusModel[s.serverStatus]);
  }
}
