import { createAction, props } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { ServerMessage } from '../../../../graphql/generated/graphql';

const contextName = '[Server Connection]';

export const isConfigured = createAction(
  `${contextName} is configured`,
);

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

export const serverMessageIsReceived = createAction(
  `${contextName} server message is received`,
  props<{ serverMessage: ServerMessage }>(),
);
