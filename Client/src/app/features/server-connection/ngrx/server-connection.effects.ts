import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, filter, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ServerMessageType } from '../../../../graphql/generated/graphql';
import { isCreated } from '../../../ngrx/app.actions';
import { ConsumeServerMessagesService } from '../services/consume-server-messages.service';
import {
  isEstablished,
  isEstablishing,
  isFailed,
  isWaiting,
  serverMessageIsReceived,
} from './server-connection.actions';

@Injectable()
export class ServerConnectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly service: ConsumeServerMessagesService,
  ) {
  }

  public appIsCreatedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isCreated),
      tap(() => this.service.subscribe()),
      map(() => isEstablishing()),
    );
  });

  public serverConnectionIsFailedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isFailed),
      map(() => isWaiting()),
    );
  });

  public serverConnectionIsWaitingEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isWaiting),
      delay(environment.serverConnectionRetryTimeoutSeconds * 1000),
      tap(() => this.service.subscribe()),
      map(() => isEstablishing()),
    );
  });

  public serverPingIsReceivedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(serverMessageIsReceived),
      filter(({ serverMessage }) => serverMessage.messageType === ServerMessageType.Ping),
      map(() => isEstablished()),
    );
  });
}
