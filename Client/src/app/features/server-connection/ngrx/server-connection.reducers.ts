import { createReducer, on } from '@ngrx/store';
import { ServerStatus } from '../activity-types/server-status';
import { isEstablished, isEstablishing, isFailed } from './server-connection.actions';

export const ServerStatusReducer = createReducer(
  ServerStatus.unknown,
  on(isEstablishing, () => ServerStatus.ping),
  on(isEstablished, () => ServerStatus.online),
  on(isFailed, () => ServerStatus.offline),
);
