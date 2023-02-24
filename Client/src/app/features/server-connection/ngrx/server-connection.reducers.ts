import { createReducer, on } from '@ngrx/store';
import { isEstablished, isEstablishing, isFailed } from './server-connection.actions';

export const ServerStatusReducer = createReducer(
  'unknown',
  on(isEstablishing, () => 'ping'),
  on(isEstablished, () => 'online'),
  on(isFailed, () => 'offline'),
);
