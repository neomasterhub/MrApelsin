import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { graphqlWsClient } from '../../../consts/graphql-ws-client';
import { isConfigured, isEstablished, isFailed } from '../ngrx/server-connection.actions';

@Injectable()
export class ConfigureGraphqlWsService {
  constructor(private readonly store: Store) {
  }

  configure(): Action {
    graphqlWsClient.on('connected', () => this.store.dispatch(isEstablished()));
    graphqlWsClient.on('error', () => this.store.dispatch(isFailed()));

    return isConfigured(); // Returns the action because in NgRx effect isConfiguring is ahead of isConfigured.
  }
}
