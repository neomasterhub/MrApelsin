import { createReducer, on } from '@ngrx/store';
import { IServerMessageModel } from '../models/server-message.model';
import { ServerStatusModel } from '../models/server-status.model';
import { isEstablished, isEstablishing, isFailed, serverMessageIsReceived } from './server-connection.actions';

export const ServerStatusReducer = createReducer(
  ServerStatusModel.unknown,
  on(isEstablishing, () => ServerStatusModel.ping),
  on(isEstablished, () => ServerStatusModel.online),
  on(isFailed, () => ServerStatusModel.offline),
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
