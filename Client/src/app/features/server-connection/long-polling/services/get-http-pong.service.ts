import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GetHttpPongGQL, GetHttpPongQuery } from '../../../../../graphql/generated/graphql';
import { isEstablished } from '../../ngrx/server-connection.actions';

@Injectable()
export class GetHttpPongService {
  readonly valueChanges: Observable<ApolloQueryResult<GetHttpPongQuery>>;

  constructor(
    getHttpPongGQL: GetHttpPongGQL,
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
