import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { isCreated } from '../../../ngrx/app.actions';
import { EstablishServerConnectionService } from '../services/establish-server-connection.service';
import { isEstablishing, isFailed, isWaiting } from './server-connection.actions';

@Injectable()
export class ServerConnectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly service: EstablishServerConnectionService,
  ) {
  }

  public appIsCreatedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isCreated),
      tap(() => this.service.establish()),
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
      tap(() => this.service.establish()),
      map(() => isEstablishing()),
    );
  });
}
