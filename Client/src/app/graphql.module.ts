import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { SplitLinkService } from './services/split-link.service';

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
