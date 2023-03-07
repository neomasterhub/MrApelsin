import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GetHttpPongGQL } from '../../../../../graphql/generated/graphql';
import { isEstablished, isEstablishing, serverMessageIsReceived } from '../../ngrx/server-connection.actions';

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

  intervalPing() {
    this.valueChanges
      .pipe(
        tap(({ data, loading }) => {
          if (loading) {
            this.store.dispatch(isEstablishing());
          } else {
            this.store.dispatch(isEstablished());
            this.store.dispatch(serverMessageIsReceived({
              serverMessage: data!.ping!
            }));
          }
        }),
      )
      .subscribe();
  }
}
