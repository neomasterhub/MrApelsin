import { createAction } from '@ngrx/store';
import { environment } from '../../../../environments/environment';

const contextName = '[Server Connection]';

export const isEstablishing = createAction(
  `${contextName} is establishing`,
);

export const isEstablished = createAction(
  `${contextName} is established`,
);

export const isFailed = createAction(
  `${contextName} is failed`,
);

export const isWaiting = createAction(
  `${contextName} is waiting for retry to be established id ${environment.serverConnectionRetryTimeoutSeconds} seconds`,
);
