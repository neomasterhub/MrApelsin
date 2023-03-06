import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, tap, withLatestFrom } from 'rxjs';
import { ServerConnectionType } from '../../activity-types/server-connection-type';
import { engineIsStarted, isEstablished, isWaiting, typeIsDefined } from '../../ngrx/server-connection.actions';
import { GetHttpPongService } from '../services/get-http-pong.service';

@Injectable()
export class LongPollingServerConnectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly getHttpPongService: GetHttpPongService,
    private readonly store: Store<{ serverConnectionType: ServerConnectionType }>,
  ) {
  }

  public serverConnectionIsDefinedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(typeIsDefined),
      filter((a) => a.connectionType === ServerConnectionType.longPolling),
      tap(() => this.getHttpPongService.ping()),
      map(() => engineIsStarted()),
    );
  });

  public serverConnectionIsEstablishedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isEstablished),
      withLatestFrom(this.store.select(s => s.serverConnectionType)),
      filter(([, serverConnectionType]) => serverConnectionType == ServerConnectionType.longPolling),
      map(() => isWaiting()),
    );
  });
}
