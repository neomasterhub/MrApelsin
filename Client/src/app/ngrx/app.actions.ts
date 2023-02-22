import { createAction } from '@ngrx/store';

const contextName = '[App]';

export const isCreated = createAction(
  `${contextName} is created`,
);
