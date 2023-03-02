import { createReducer, on } from '@ngrx/store';
import { ServerStatus } from '../activity-types/server-status';
import { IServerMessageModel } from '../models/server-message.model';
import { isEstablished, isEstablishing, isFailed, serverMessageIsReceived } from './server-connection.actions';

export const ServerStatusReducer = createReducer(
  ServerStatus.unknown,
  on(isEstablishing, () => ServerStatus.ping),
  on(isEstablished, () => ServerStatus.online),
  on(isFailed, () => ServerStatus.offline),
);

export const ServerMessageReducer = createReducer(
  undefined as IServerMessageModel | undefined,
  on(serverMessageIsReceived, (state, { serverMessage }) => ({
    datetime: new Date(),
    payload: {
      messageType: serverMessage.messageType,
      contentType: serverMessage.contentType,
      content: serverMessage.content,
    },
  })),
);
