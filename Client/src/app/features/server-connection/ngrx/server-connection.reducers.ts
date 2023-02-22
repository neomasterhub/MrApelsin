import { createReducer, on } from '@ngrx/store';
import { isEstablished, isEstablishing, isFailed } from './server-connection.actions';

const initialState = 'unknown';

export const ServerConnectionReducer = createReducer(
  initialState,
  on(isEstablishing, () => 'ping'),
  on(isEstablished, () => 'online'),
  on(isFailed, () => 'offline'),
);