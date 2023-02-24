import { createReducer, on } from '@ngrx/store';
import { IServerMessageModel } from '../models/server-message.model';
import { isEstablished, isEstablishing, isFailed, serverMessageIsReceived } from './server-connection.actions';

export const ServerStatusReducer = createReducer(
  'unknown',
  on(isEstablishing, () => 'ping'),
  on(isEstablished, () => 'online'),
  on(isFailed, () => 'offline'),
);

export const ServerMessageReducer = createReducer(
  undefined as IServerMessageModel | undefined,
  on(serverMessageIsReceived, (state, { serverMessage }) => ({
    datetime: new Date(),
    payload: {
      messageType: serverMessage.messageType,
      text: serverMessage.text,
    },
  })),
);
