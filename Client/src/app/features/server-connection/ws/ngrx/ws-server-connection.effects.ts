import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, filter, map, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ServerConnectionType } from '../../activity-types/server-connection-type';
import { isConfigured, isEstablishing, isFailed, isWaiting, typeIsDefined } from '../../ngrx/server-connection.actions';
import { ConfigureGraphqlWsService } from '../services/configure-graphql-ws.service';
import { ConsumeWsMessagesService } from '../services/consume-ws-messages.service';

@Injectable()
export class WsServerConnectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly configureGraphqlWsService: ConfigureGraphqlWsService,
    private readonly consumeWsMessagesService: ConsumeWsMessagesService,
  ) {
  }

  public serverConnectionIsDefinedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(typeIsDefined),
      filter((a) => a.connectionType === ServerConnectionType.webSocket),
      map(() => this.configureGraphqlWsService.configure()),
    );
  });

  public serverConnectionIsConfiguredEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isConfigured),
      tap(() => this.consumeWsMessagesService.subscribe()),
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
      delay(environment.serverConnection.retryTimeoutSeconds * 1000),
      tap(() => this.consumeWsMessagesService.subscribe()),
      map(() => isEstablishing()),
    );
  });
}
