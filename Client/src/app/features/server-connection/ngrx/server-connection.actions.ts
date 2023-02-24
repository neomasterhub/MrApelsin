import { ApolloError } from '@apollo/client';
import { createAction, props } from '@ngrx/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { environment } from '../../../../environments/environment';
import { ServerMessage } from '../../../../graphql/generated/graphql';

const contextName = '[Server Connection]';

export const isEstablishing = createAction(
  `${contextName} is establishing`,
);

export const isEstablished = createAction(
  `${contextName} is established`,
);

export const isFailed = createAction(
  `${contextName} is failed`,
  props<{ error: ApolloError }>(),
);

export const isWaiting = createAction(
  `${contextName} is waiting for retry to be established id ${environment.serverConnectionRetryTimeoutSeconds} seconds`,
);

export const messageIsReceived = createAction(
  `${contextName} message is received`,
  props<{ serverMessage: Maybe<ServerMessage> }>(),
);
