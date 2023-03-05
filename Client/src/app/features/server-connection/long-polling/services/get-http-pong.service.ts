import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GetHttpPongGQL, GetHttpPongQuery } from '../../../../../graphql/generated/graphql';
import { isEstablished } from '../../ngrx/server-connection.actions';

@Injectable()
export class GetHttpPongService {
  readonly pollInterval = environment.serverConnection.longPolling.longPollingOperations
    .find((o) => o.name === 'GetHttpPong')!.delay;

  readonly valueChanges: Observable<ApolloQueryResult<GetHttpPongQuery>>;

  constructor(
    getHttpPongGQL: GetHttpPongGQL,
    private readonly store: Store,
  ) {
    this.valueChanges = getHttpPongGQL.watch({}, {
      pollInterval: this.pollInterval,
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
