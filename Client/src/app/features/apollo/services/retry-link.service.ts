import { Injectable } from '@angular/core';
import { RetryLink } from '@apollo/client/link/retry';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { longPollingOperations } from '../../../consts/long-polling-operations';
import { isFailed } from '../../server-connection/ngrx/server-connection.actions';

@Injectable()
export class RetryLinkService {
  readonly retryLink;

  constructor(store: Store) {
    this.retryLink = new RetryLink({
      attempts: (count, operation) => {
        // A place for a service that dispatches an action for each long polling operation.
        // TODO: Add interceptor to ILongPollingOperation.
        if (operation.operationName == environment.serverConnection.longPollingOperation) {
          store.dispatch(isFailed());
        }

        return longPollingOperations
          .some(o => o.name === operation.operationName);
      },
      delay: (count, operation) => {
        return longPollingOperations
          .find(o => o.name === operation.operationName)!.delay;
      },
    });
  }
}
