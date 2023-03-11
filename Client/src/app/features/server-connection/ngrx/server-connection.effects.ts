import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { isCreated } from '../../../ngrx/app.actions';
import { isFailed, isWaiting, typeIsDefined } from './server-connection.actions';

@Injectable()
export class ServerConnectionEffects {
  constructor(private readonly actions$: Actions) {
  }

  public isCreatedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isCreated),
      map(() => typeIsDefined({ connectionType: environment.serverConnection.connectionType })),
    );
  });

  public isFailedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isFailed),
      map(() => isWaiting()),
    );
  });
}
