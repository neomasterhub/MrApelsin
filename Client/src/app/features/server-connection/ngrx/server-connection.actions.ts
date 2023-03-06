import { createAction, props } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { ServerMessage } from '../../../../graphql/generated/graphql';
import { ServerConnectionType } from '../activity-types/server-connection-type';

const contextName = '[Server Connection]';

export const typeIsDefined = createAction(
  `${contextName} type is defined`,
  props<{ connectionType: ServerConnectionType }>(),
);

export const engineIsStarted = createAction(
  `${contextName} engine is started`,
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
  `${contextName} is waiting for retry to be established in ${environment.serverConnection.attemptIntervalSeconds} seconds`,
);

export const serverMessageIsReceived = createAction(
  `${contextName} server message is received`,
  props<{ serverMessage: ServerMessage }>(),
);
