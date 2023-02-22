import { ApolloError } from '@apollo/client';
import { createAction, props } from '@ngrx/store';

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
  `${contextName} is waiting for retry to be established`
);
