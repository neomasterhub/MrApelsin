import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { graphqlWsClient } from './consts/graphql-ws-client';
import { RetryLinkService } from './services/retry-link.service';

export function createApollo(httpLink: HttpLink, retryLinkService: RetryLinkService): ApolloClientOptions<any> {
  const splitLinkHttp = httpLink.create({
    uri: environment.graphqlOrigins.http,
  });

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
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [
        HttpLink,
        RetryLinkService,
      ],
    },
  ],
})
export class GraphQLModule {
}
