import { Injectable } from '@angular/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLinkService } from './http-link.service';
import { RetryLinkService } from './retry-link.service';
import { WebSocketLinkService } from './web-socket-link.service';

@Injectable()
export class SplitLinkService {
  readonly splitLink;

  constructor(
    retryLinkService: RetryLinkService,
    webSocketLinkService: WebSocketLinkService,
    httpLinkService: HttpLinkService,
  ) {
    this.splitLink = retryLinkService.retryLink
      .split(
        ({ query }) => {
          const definition = getMainDefinition(query);

          return (
            definition.kind === 'OperationDefinition'
            && definition.operation === 'subscription'
          );
        },
        webSocketLinkService.webSocketLink,
        httpLinkService.httpLink,
      );
  }
}
