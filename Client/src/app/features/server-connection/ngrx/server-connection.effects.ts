import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { isCreated } from '../../../ngrx/app.actions';
import { ConfigureGraphqlWsService } from '../services/configure-graphql-ws.service';
import { ConsumeServerMessagesService } from '../services/consume-server-messages.service';
import { isConfigured, isEstablishing, isFailed, isWaiting } from './server-connection.actions';

@Injectable()
export class ServerConnectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly configureGraphqlWsService: ConfigureGraphqlWsService,
    private readonly consumeServerMessagesService: ConsumeServerMessagesService,
  ) {
  }

  public appIsCreatedEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isCreated),
      map(() => this.configureGraphqlWsService.configure()),
    );
  });

  public serverConnectionIsConfiguredEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isConfigured),
      tap(() => this.consumeServerMessagesService.subscribe()),
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
      tap(() => this.consumeServerMessagesService.subscribe()),
      map(() => isEstablishing()),
    );
  });
}
