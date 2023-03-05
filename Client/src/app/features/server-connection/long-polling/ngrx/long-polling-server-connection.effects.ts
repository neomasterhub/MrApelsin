import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs';
import { ServerConnectionType } from '../../activity-types/server-connection-type';
import { isEstablishing, typeIsDefined } from '../../ngrx/server-connection.actions';
import { GetHttpPongService } from '../services/get-http-pong.service';

@Injectable()
export class LongPollingServerConnectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly getHttpPongService: GetHttpPongService,
  ) {
  }

  public serverConnectionIsDefinedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(typeIsDefined),
      filter((a) => a.connectionType === ServerConnectionType.longPolling),
      tap(() => this.getHttpPongService.ping()),
      map(() => isEstablishing()),
    );
  });
}
