import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appVersion } from '../../../consts/app-version';
import { ServerStatus } from '../../server-connection/activity-types/server-status';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent {
  serverStatus$: Observable<string>;

  version = appVersion;

  currentYear = new Date().getFullYear();

  constructor(store: Store<{ serverStatus: ServerStatus }>) {
    this.serverStatus$ = store.select(s => ServerStatus[s.serverStatus]);
  }
}
