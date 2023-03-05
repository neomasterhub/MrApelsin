import { environment } from '../../environments/environment';
import { ILongPollingOperation } from '../activity-types/long-polling-operation';

export const longPollingOperations: ILongPollingOperation[] = [
  {
    name: environment.serverConnection.longPolling.operationName,
    delay: environment.serverConnection.attemptIntervalSeconds * 1000,
  },
];
