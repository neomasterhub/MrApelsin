import { Injectable } from '@angular/core';
import { RetryLink } from '@apollo/client/link/retry';
import { longPollingOperations } from '../consts/long-polling-operations';

@Injectable()
export class RetryLinkService {
  readonly retryLinkOptions: RetryLink.Options;

  constructor() {
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
