import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GetHttpPongGQL } from '../../../../../graphql/generated/graphql';
import { isEstablished } from '../../ngrx/server-connection.actions';

@Injectable()
export class GetHttpPongService {
  readonly valueChanges;

  constructor(
    private readonly getHttpPongGQL: GetHttpPongGQL,
    private readonly store: Store,
  ) {
    this.valueChanges = getHttpPongGQL.watch({}, {
      pollInterval: environment.serverConnection.attemptIntervalSeconds * 1000,
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  ping() {
    this.valueChanges
      .pipe(
        tap(() => this.store.dispatch(isEstablished())),
      )
      .subscribe();
  }
}
