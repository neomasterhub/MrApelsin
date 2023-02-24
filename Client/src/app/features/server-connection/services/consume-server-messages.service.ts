import { Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client';
import { Store } from '@ngrx/store';
import { ServerMessageReceivedGQL } from '../../../../graphql/generated/graphql';
import { isFailed } from '../ngrx/server-connection.actions';

@Injectable()
export class ConsumeServerMessagesService {
  constructor(
    private readonly serverMessageReceivedGQL: ServerMessageReceivedGQL,
    private readonly store: Store,
  ) {
  }

  /*
  Connects to the websocket and processes incoming messages.
   */
  subscribe() {
    this.serverMessageReceivedGQL.subscribe()
      .subscribe({
        error: (error: ApolloError) => this.store.dispatch(isFailed({ error })),
      });
  }
}
