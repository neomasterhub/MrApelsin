import { Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ServerMessageReceivedGQL, ServerMessageType } from '../../../../graphql/generated/graphql';
import { isEstablished, isFailed } from '../ngrx/server-connection.actions';

@Injectable()
export class EstablishServerConnectionService {
  constructor(
    private readonly serverMessageReceivedGQL: ServerMessageReceivedGQL,
    private readonly store: Store<{ serverConnection: string }>,
  ) {
  }

  establish() {
    this.serverMessageReceivedGQL.subscribe()
      .pipe(
        tap(({ data }) => {
          if (data?.serverMessageReceived?.messageType === ServerMessageType.AppVersion) {
            this.store.dispatch(isEstablished());
          }
        },
        ),
      )
      .subscribe({
        error: (error: ApolloError) => this.store.dispatch(isFailed({ error })),
      });
  }
}
