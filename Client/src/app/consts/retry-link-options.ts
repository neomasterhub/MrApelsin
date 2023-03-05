import { RetryLink } from '@apollo/client/link/retry';
import { environment } from '../../environments/environment';

const longPollingOperations = environment.serverConnection.longPolling.operations;

export const retryLinkOptions: RetryLink.Options = {
  attempts: (count, operation) => longPollingOperations
    .some((o) => o.name === operation.operationName),
  delay: (count, operation) => longPollingOperations
    .find((o) => o.name === operation.operationName)!.delay,
};
