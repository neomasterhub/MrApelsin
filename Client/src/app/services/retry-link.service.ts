import { Injectable } from '@angular/core';
import { RetryLink } from '@apollo/client/link/retry';
import { environment } from '../../environments/environment';

@Injectable()
export class RetryLinkService {
  readonly retryLinkOptions: RetryLink.Options;

  constructor() {
    const longPollingOperations = environment.serverConnection.longPolling.operations;

    this.retryLinkOptions = {
      attempts: (count, operation) => {
        return longPollingOperations
          .some((o) => o.name === operation.operationName);
      },
      delay: (count, operation) => {
        return longPollingOperations
          .find((o) => o.name === operation.operationName)!.delay;
      },
    };
  }
}
