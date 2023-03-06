import { environment } from '../../environments/environment';
import { ILongPollingOperation } from '../activity-types/long-polling-operation';

export const longPollingOperations: ILongPollingOperation[] = [
  {
    label: 'Server Connection Check',
    name: environment.serverConnection.longPollingOperation,
    delay: environment.serverConnection.attemptIntervalSeconds * 1000,
  },
];
