import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { isCreated } from '../../../ngrx/app.actions';
import { ConfigureGraphqlWsService } from '../services/configure-graphql-ws.service';
import { ConsumeServerMessagesService } from '../services/consume-server-messages.service';
import { isConfigured, isConfiguring, isEstablishing } from './server-connection.actions';

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
      tap(() => this.configureGraphqlWsService.configure()),
      map(() => isConfiguring()),
    );
  });

  public serverConnectionIsConfiguredEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(isConfigured),
      tap(() => this.consumeServerMessagesService.subscribe()),
      map(() => isEstablishing()),
    );
  });
}
