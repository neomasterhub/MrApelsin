import { Injectable } from '@angular/core';
import { RetryLink } from '@apollo/client/link/retry';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { longPollingOperations } from '../consts/long-polling-operations';
import { isFailed } from '../features/server-connection/ngrx/server-connection.actions';

@Injectable()
export class RetryLinkService {
  readonly retryLinkOptions: RetryLink.Options;

  constructor(private readonly store: Store) {
    this.retryLinkOptions = {
      attempts: (count, operation) => {
        if (operation.operationName == environment.serverConnection.longPolling.operationName) {
          this.store.dispatch(isFailed());
        }

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
