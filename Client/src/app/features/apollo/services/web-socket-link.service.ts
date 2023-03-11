import { Injectable } from '@angular/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { Store } from '@ngrx/store';
import { createClient } from 'graphql-ws';
import { environment } from '../../../../environments/environment';
import { isEstablished, isFailed } from '../../server-connection/ngrx/server-connection.actions';

@Injectable()
export class WebSocketLinkService {
  readonly webSocketLink;

  constructor(store: Store) {
    const graphqlWsClient = createClient({
      url: environment.graphqlOrigins.ws,
    });

    graphqlWsClient.on('connected', () => store.dispatch(isEstablished()));
    graphqlWsClient.on('error', () => store.dispatch(isFailed()));

    this.webSocketLink = new GraphQLWsLink(graphqlWsClient);
  }
}
