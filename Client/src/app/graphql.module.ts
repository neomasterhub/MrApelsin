import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Store } from '@ngrx/store';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createClient } from 'graphql-ws';
import { environment } from '../environments/environment';
import { isEstablished, isFailed } from './features/server-connection/ngrx/server-connection.actions';
import { RetryLinkService } from './services/retry-link.service';

export function createApollo(httpLink: HttpLink, retryLinkService: RetryLinkService, store: Store): ApolloClientOptions<any> {
  const splitLinkHttp = httpLink.create({
    uri: environment.graphqlOrigins.http,
  });

  const graphqlWsClient = createClient({
    url: environment.graphqlOrigins.ws,
  });

  graphqlWsClient.on('connected', () => store.dispatch(isEstablished()));
  graphqlWsClient.on('error', () => store.dispatch(isFailed()));

  const splitLinkWs = new GraphQLWsLink(graphqlWsClient);

  const splitLink = new RetryLink(retryLinkService.retryLinkOptions)
    .split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === 'OperationDefinition'
          && definition.operation === 'subscription'
        );
      },
      splitLinkWs,
      splitLinkHttp,
    );

  return {
    link: splitLink,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    RetryLinkService,
    Store,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [
        HttpLink,
        RetryLinkService,
        Store,
      ],
    },
  ],
})
export class GraphQLModule {
}
