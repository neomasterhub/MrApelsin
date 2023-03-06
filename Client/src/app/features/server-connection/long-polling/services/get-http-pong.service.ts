import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GetHttpPongGQL } from '../../../../../graphql/generated/graphql';

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
      useInitialLoading: true,
      notifyOnNetworkStatusChange: true,
    }).valueChanges;
  }

  ping() {
    this.valueChanges
      .pipe(
        tap(({ data, loading, networkStatus }) => {
          console.log({
            event: loading ? 'request start' : 'response received',
            loading,
            networkStatus,
            data: data?.ping?.utcDatetime,
          });
        })
      )
      .subscribe();
  }
}
