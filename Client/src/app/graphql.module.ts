import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { HttpLinkService } from './services/http-link.service';
import { RetryLinkService } from './services/retry-link.service';
import { SplitLinkService } from './services/split-link.service';
import { WebSocketLinkService } from './services/web-socket-link.service';

export function createApollo(splitLinkService: SplitLinkService): ApolloClientOptions<any> {
  return {
    link: splitLinkService.splitLink,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    SplitLinkService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [
        SplitLinkService,
      ],
    },
  ],
})
export class GraphQLModule {
}
