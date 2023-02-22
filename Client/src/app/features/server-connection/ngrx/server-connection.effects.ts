import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { isCreated } from '../../../ngrx/app.actions';
import { EstablishServerConnectionService } from '../services/establish-server-connection.service';
import { isEstablishing } from './server-connection.actions';

@Injectable()
export class ServerConnectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly service: EstablishServerConnectionService,
  ) {
  }

  public appLoadEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isCreated),
      map(() => {
        this.service.establish();

        return isEstablishing();
      }),
    );
  });
}
