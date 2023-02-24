import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PingGQL, ServerMessageReceivedGQL } from '../../../../graphql/generated/graphql';
import { isFailed } from '../ngrx/server-connection.actions';

@Injectable()
export class ConsumeServerMessagesService {
  constructor(
    private readonly serverMessageReceivedGQL: ServerMessageReceivedGQL,
    private readonly ping: PingGQL,
    private readonly store: Store,
  ) {
  }

  subscribe() {
    this.serverMessageReceivedGQL.subscribe()
      .subscribe({
        error: () => this.store.dispatch(isFailed()),
      });
  }
}
