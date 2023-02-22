import { createAction } from '@ngrx/store';

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
