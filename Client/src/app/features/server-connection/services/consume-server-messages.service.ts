import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ServerMessageReceivedGQL } from '../../../../graphql/generated/graphql';
import { isFailed, serverMessageIsReceived } from '../ngrx/server-connection.actions';

@Injectable()
export class ConsumeServerMessagesService {
  constructor(
    private readonly serverMessageReceivedGQL: ServerMessageReceivedGQL,
    private readonly store: Store,
  ) {
  }

  subscribe() {
    this.serverMessageReceivedGQL.subscribe()
      .pipe(
        tap(({ data }) => this.store.dispatch(serverMessageIsReceived({ serverMessage: data!.serverMessageReceived! }))),
      )
      .subscribe({
        error: () => this.store.dispatch(isFailed()),
      });
  }
}
