import { RetryLink } from '@apollo/client/link/retry';
import { environment } from '../../environments/environment';

const longPollingOperations = environment.serverConnection.longPolling.longPollingOperations;

export const retryLinkOptions: RetryLink.Options = {
  attempts: (count, operation, error) => longPollingOperations
    .some((o) => o.name === operation.operationName),
  delay: (count, operation, error) => longPollingOperations
    .find((o) => o.name === operation.operationName)!.delay,
};
