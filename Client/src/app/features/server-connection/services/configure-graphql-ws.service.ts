import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { graphqlWsClient } from '../../../consts/graphql-ws-client';
import { isConfigured, isEstablished, isEstablishing, isFailed } from '../ngrx/server-connection.actions';

@Injectable()
export class ConfigureGraphqlWsService {
  constructor(private readonly store: Store) {
  }

  configure() {
    graphqlWsClient.on('connecting', () => this.store.dispatch(isEstablishing()));
    graphqlWsClient.on('connected', () => this.store.dispatch(isEstablished()));
    graphqlWsClient.on('error', () => this.store.dispatch(isFailed()));
    this.store.dispatch(isConfigured());
  }
}