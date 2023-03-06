import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, filter, map, tap, withLatestFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ServerConnectionType } from '../../activity-types/server-connection-type';
import { engineIsStarted, isEstablishing, isWaiting, typeIsDefined } from '../../ngrx/server-connection.actions';
import { ConsumeWsMessagesService } from '../services/consume-ws-messages.service';

@Injectable()
export class WebSocketServerConnectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly consumeWsMessagesService: ConsumeWsMessagesService,
    private readonly store: Store<{ serverConnectionType: ServerConnectionType }>,
  ) {
  }

  public serverConnectionIsDefinedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(typeIsDefined),
      filter((a) => a.connectionType === ServerConnectionType.webSocket),
      tap(() => this.consumeWsMessagesService.subscribe()),
      map(() => engineIsStarted()),
    );
  });

  public serverConnectionEngineIsStartedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(engineIsStarted),
      withLatestFrom(this.store.select(s => s.serverConnectionType)),
      filter(([, serverConnectionType]) => serverConnectionType == ServerConnectionType.webSocket),
      map(() => isEstablishing()),
    );
  });

  public serverConnectionIsWaitingEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isWaiting),
      withLatestFrom(this.store.select(s => s.serverConnectionType)),
      filter(([, serverConnectionType]) => serverConnectionType == ServerConnectionType.webSocket),
      delay(environment.serverConnection.attemptIntervalSeconds * 1000),
      tap(() => this.consumeWsMessagesService.subscribe()),
      map(() => isEstablishing()),
    );
  });
}
